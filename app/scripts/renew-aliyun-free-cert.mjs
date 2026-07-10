import { createHash, createHmac, randomUUID, X509Certificate } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, '..');
const configPath = path.join(process.env.USERPROFILE ?? process.env.HOME ?? '', '.ossutilconfig');

const bucket = 'aqztjx-site';
const ossEndpoint = 'oss-cn-beijing.aliyuncs.com';
const ossHost = `${bucket}.${ossEndpoint}`;
const productCode = 'digicert-free-1-free';
const freeCertificateAnnualQuota = 20;
const primaryDomain = process.env.ALIYUN_CERT_PRIMARY_DOMAIN ?? 'aqztjx.top';
const requestDomain = process.env.ALIYUN_CERT_REQUEST_DOMAIN ?? `www.${primaryDomain}`;
const cdnDomains = (process.env.ALIYUN_CDN_DOMAINS ?? primaryDomain)
  .split(',')
  .map((domain) => domain.trim())
  .filter(Boolean);
const renewBeforeDays = Number.parseInt(process.env.ALIYUN_CERT_RENEW_BEFORE_DAYS ?? '30', 10);
const pollIntervalMs = Number.parseInt(process.env.ALIYUN_CERT_POLL_INTERVAL_MS ?? '30000', 10);
const pollTimeoutMs = Number.parseInt(process.env.ALIYUN_CERT_POLL_TIMEOUT_MS ?? '900000', 10);

const mode = process.argv.includes('--check') ? 'check' : process.argv.includes('--dry-run') ? 'dry-run' : 'renew';

function parseConfig(text) {
  const config = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('[') || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    config[trimmed.slice(0, index).trim()] = trimmed.slice(index + 1).trim();
  }
  return config;
}

async function readCredentials({ required }) {
  const envCredentials = {
    accessKeyID:
      process.env.ALIYUN_ACCESS_KEY_ID ??
      process.env.ALIBABA_CLOUD_ACCESS_KEY_ID ??
      process.env.ACCESS_KEY_ID,
    accessKeySecret:
      process.env.ALIYUN_ACCESS_KEY_SECRET ??
      process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET ??
      process.env.ACCESS_KEY_SECRET,
    stsToken:
      process.env.ALIYUN_SECURITY_TOKEN ??
      process.env.ALIBABA_CLOUD_SECURITY_TOKEN ??
      process.env.SECURITY_TOKEN,
  };

  if (envCredentials.accessKeyID && envCredentials.accessKeySecret) return envCredentials;

  try {
    const config = parseConfig(await readFile(configPath, 'utf8'));
    if (config.accessKeyID && config.accessKeySecret) return config;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  if (!required) return null;
  throw new Error(
    'Missing Aliyun credentials. Set ALIYUN_ACCESS_KEY_ID/ALIYUN_ACCESS_KEY_SECRET or configure ~/.ossutilconfig.',
  );
}

function percentEncode(value) {
  return encodeURIComponent(String(value))
    .replace(/\+/g, '%20')
    .replace(/\*/g, '%2A')
    .replace(/%7E/g, '~')
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}

async function aliyunRpc({ credentials, endpoint, version, action, params = {}, method = 'POST' }) {
  const allParams = {
    Format: 'JSON',
    Version: version,
    AccessKeyId: credentials.accessKeyID,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    SignatureVersion: '1.0',
    SignatureNonce: randomUUID(),
    Action: action,
    ...params,
  };
  if (credentials.stsToken) allParams.SecurityToken = credentials.stsToken;

  const canonicalQuery = Object.keys(allParams)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(allParams[key])}`)
    .join('&');
  const stringToSign = `${method}&${percentEncode('/')}&${percentEncode(canonicalQuery)}`;
  const signature = createHmac('sha1', `${credentials.accessKeySecret}&`).update(stringToSign).digest('base64');
  const body = `${canonicalQuery}&Signature=${percentEncode(signature)}`;

  const response = await fetch(`https://${endpoint}/`, {
    method,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!response.ok || json.Code) {
    const code = json.Code ? ` ${json.Code}` : '';
    const message = json.Message ? ` ${json.Message}` : text;
    throw new Error(`${action} failed: HTTP ${response.status}${code}${message}`);
  }
  return json;
}

async function cas(credentials, action, params = {}) {
  return aliyunRpc({
    credentials,
    endpoint: 'cas.aliyuncs.com',
    version: '2020-04-07',
    action,
    params,
  });
}

async function cdn(credentials, action, params = {}) {
  return aliyunRpc({
    credentials,
    endpoint: 'cdn.aliyuncs.com',
    version: '2018-05-10',
    action,
    params,
  });
}

function daysUntil(date) {
  return Math.floor((date.getTime() - Date.now()) / 86400000);
}

function getOnlineCertificate(domain) {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        host: domain,
        servername: domain,
        method: 'HEAD',
        path: '/',
        timeout: 15000,
        rejectUnauthorized: false,
      },
      (response) => {
        const certificate = response.socket.getPeerCertificate();
        response.resume();
        resolve({
          domain,
          statusCode: response.statusCode,
          authorized: response.socket.authorized,
          authorizationError: response.socket.authorizationError,
          validTo: certificate.valid_to ? new Date(certificate.valid_to) : null,
          subjectaltname: certificate.subjectaltname ?? '',
          subject: certificate.subject ?? {},
          issuer: certificate.issuer ?? {},
        });
      },
    );
    request.on('timeout', () => request.destroy(new Error(`HTTPS check timed out for ${domain}`)));
    request.on('error', reject);
    request.end();
  });
}

function certificateCoversDomain(pem, domain) {
  const certificate = new X509Certificate(pem);
  const names = (certificate.subjectAltName ?? '')
    .split(',')
    .map((item) => item.trim().replace(/^DNS:/, ''));
  return names.includes(domain) || certificate.subject.includes(`CN=${domain}`);
}

function summarizeOnlineCertificate(result) {
  const expires = result.validTo ? `${result.validTo.toISOString().slice(0, 10)} (${daysUntil(result.validTo)} days)` : 'unknown';
  const status = result.authorized ? 'valid' : `invalid (${result.authorizationError ?? 'unknown'})`;
  const san = result.subjectaltname || 'unknown';
  const trimmedSan = san.length > 180 ? `${san.slice(0, 180)}...` : san;
  return `${result.domain}: HTTP ${result.statusCode}, ${status}, expires ${expires}, SAN ${trimmedSan}`;
}

async function describePackageIfPossible(credentials) {
  if (!credentials) return null;
  try {
    return await cas(credentials, 'DescribePackageState', { ProductCode: productCode });
  } catch (error) {
    console.log(`Skipped free certificate quota check: ${error.message}`);
    return null;
  }
}

async function describePackageRequired(credentials) {
  return cas(credentials, 'DescribePackageState', { ProductCode: productCode });
}

function assertPackageQuota(packageState) {
  if (!packageState) return;
  const total = Number(packageState.TotalCount ?? freeCertificateAnnualQuota);
  const used = Number(packageState.UsedCount ?? packageState.IssuedCount ?? 0);
  const remaining = total - used;
  if (remaining <= 0) {
    throw new Error(`No free certificate quota left for ${productCode}. Total=${total}, Used=${used}.`);
  }
}

async function putOssTextObject({ credentials, key, content }) {
  const date = new Date().toUTCString();
  const contentType = 'text/plain; charset=utf-8';
  const contentBuffer = Buffer.from(content, 'utf8');
  const contentMd5 = createHash('md5').update(contentBuffer).digest('base64');
  const ossHeaders = {
    'x-oss-object-acl': 'public-read',
    'x-oss-storage-class': 'Standard',
    ...(credentials.stsToken ? { 'x-oss-security-token': credentials.stsToken } : {}),
  };
  const canonicalHeaders = Object.entries(ossHeaders)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `${name}:${value}\n`)
    .join('');
  const resource = `/${bucket}/${key}`;
  const stringToSign = ['PUT', contentMd5, contentType, date, `${canonicalHeaders}${resource}`].join('\n');
  const signature = createHmac('sha1', credentials.accessKeySecret).update(stringToSign).digest('base64');

  const headers = {
    Authorization: `OSS ${credentials.accessKeyID}:${signature}`,
    Date: date,
    Host: ossHost,
    'Content-Type': contentType,
    'Content-Length': contentBuffer.length,
    'Content-MD5': contentMd5,
    'Cache-Control': 'no-cache',
    ...ossHeaders,
  };

  await new Promise((resolve, reject) => {
    const request = https.request(
      {
        method: 'PUT',
        host: ossHost,
        path: `/${encodeURI(key).replace(/%2F/g, '/')}`,
        headers,
      },
      (response) => {
        response.resume();
        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve();
            return;
          }
          reject(new Error(`OSS validation upload failed for ${key}: HTTP ${response.statusCode}`));
        });
      },
    );
    request.on('error', reject);
    request.setTimeout(30_000, () => request.destroy(new Error(`OSS upload timed out: ${key}`)));
    request.end(contentBuffer);
  });
}

async function createCertificateOrder(credentials) {
  return cas(credentials, 'CreateCertificateForPackageRequest', {
    ProductCode: productCode,
    Domain: requestDomain,
    ValidateType: 'FILE',
  });
}

async function waitForCertificate(credentials, orderId) {
  const startedAt = Date.now();
  let validationUploaded = false;

  while (Date.now() - startedAt < pollTimeoutMs) {
    const state = await cas(credentials, 'DescribeCertificateState', { OrderId: orderId });

    if (state.Type === 'domain_verify') {
      if (state.ValidateType !== 'FILE') {
        throw new Error(`Expected FILE validation, got ${state.ValidateType}.`);
      }
      if (!state.Uri || !state.Content) {
        throw new Error('Certificate is waiting for FILE validation but Uri/Content is missing.');
      }
      if (!validationUploaded) {
        const key = state.Uri.replace(/^\//, '');
        await putOssTextObject({ credentials, key, content: state.Content });
        console.log(`uploaded validation file ${state.Uri}`);
        validationUploaded = true;
      }
    }

    if (state.Type === 'certificate') {
      if (!state.Certificate || !state.PrivateKey || !state.CertId) {
        throw new Error('Certificate was issued but Certificate, PrivateKey, or CertId is missing.');
      }
      return state;
    }

    if (state.Type === 'verify_fail') {
      throw new Error('Certificate verification failed. Check domain validation and order data in Alibaba Cloud.');
    }

    console.log(`certificate order ${orderId} status: ${state.Type ?? 'unknown'}`);
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  throw new Error(`Timed out waiting for certificate order ${orderId}.`);
}

async function updateCdnCertificate(credentials, domain, certificate) {
  return cdn(credentials, 'SetCdnDomainSSLCertificate', {
    DomainName: domain,
    SSLProtocol: 'on',
    CertType: 'cas',
    CertId: certificate.CertId,
    CertRegion: 'cn-hangzhou',
  });
}

async function checkMode(credentials) {
  const results = [];
  for (const domain of cdnDomains) {
    try {
      results.push(summarizeOnlineCertificate(await getOnlineCertificate(domain)));
    } catch (error) {
      results.push(`${domain}: ${error.message}`);
    }
  }

  console.log('HTTPS certificate check:');
  for (const result of results) console.log(`- ${result}`);

  const packageState = await describePackageIfPossible(credentials);
  if (packageState) {
    const total = Number(packageState.TotalCount ?? freeCertificateAnnualQuota);
    const used = Number(packageState.UsedCount ?? packageState.IssuedCount ?? 0);
    const remaining = total - used;
    console.log(`Free certificate quota: ${remaining}/${total} remaining (${productCode}).`);
  } else {
    console.log('Aliyun quota/API checks were skipped.');
  }
}

async function dryRunMode(credentials) {
  await checkMode(credentials);
  console.log('\nDry run plan:');
  console.log(`- Request domain: ${requestDomain}`);
  console.log(`- Required coverage: ${primaryDomain}`);
  console.log(`- CDN domains to update: ${cdnDomains.join(', ')}`);
  console.log(`- Renew threshold: ${renewBeforeDays} days`);
  console.log('- No certificate request, OSS upload, or CDN update was performed.');

}

async function renewMode(credentials) {
  const online = await getOnlineCertificate(primaryDomain).catch(() => null);
  if (online?.validTo) {
    const remainingDays = daysUntil(online.validTo);
    console.log(summarizeOnlineCertificate(online));
    if (online.authorized && remainingDays > renewBeforeDays) {
      console.log(`Certificate still has ${remainingDays} days left; renewal threshold is ${renewBeforeDays} days.`);
      return;
    }
  }

  const packageState = await describePackageRequired(credentials);
  assertPackageQuota(packageState);

  const { OrderId } = await createCertificateOrder(credentials);
  if (!OrderId) throw new Error('CreateCertificateForPackageRequest did not return OrderId.');
  console.log(`created certificate order ${OrderId}`);

  const certificate = await waitForCertificate(credentials, OrderId);
  if (!certificateCoversDomain(certificate.Certificate, primaryDomain)) {
    throw new Error(
      `Issued certificate ${certificate.CertId} does not cover ${primaryDomain}. Do not deploy a partial certificate.`,
    );
  }

  for (const domain of cdnDomains) {
    await updateCdnCertificate(credentials, domain, certificate);
    console.log(`updated CDN certificate for ${domain} with CertId ${certificate.CertId}`);
  }

  console.log('Post-deploy HTTPS check:');
  for (const domain of cdnDomains) {
    console.log(`- ${summarizeOnlineCertificate(await getOnlineCertificate(domain))}`);
  }
}

const credentials = await readCredentials({ required: mode === 'renew' });

if (mode === 'check') {
  await checkMode(credentials);
} else if (mode === 'dry-run') {
  await dryRunMode(credentials);
} else {
  await renewMode(credentials);
}
