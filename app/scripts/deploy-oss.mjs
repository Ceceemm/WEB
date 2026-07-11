import { createHash, createHmac } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDeployMode, runDeployMode } from './deploy-mode.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, '..');
const distDir = path.join(appDir, 'dist');
const configPath = path.join(process.env.USERPROFILE ?? process.env.HOME ?? '', '.ossutilconfig');

const bucket = 'aqztjx-site';
const endpoint = 'oss-cn-beijing.aliyuncs.com';
const host = `${bucket}.${endpoint}`;

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
  ['.gz', 'application/gzip'],
]);

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

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function toObjectKey(filePath) {
  return path.relative(distDir, filePath).split(path.sep).join('/');
}

function cacheControlFor(key) {
  if (key.startsWith('assets/')) return 'public, max-age=31536000, immutable';
  return 'no-cache';
}

async function putObject({ accessKeyID, accessKeySecret, stsToken }, filePath, objectKey = toObjectKey(filePath)) {
  const key = objectKey;
  const content = await readFile(filePath);
  const contentMd5 = createHash('md5').update(content).digest('base64');
  const contentType = mimeTypes.get(path.extname(filePath).toLowerCase()) ?? 'application/octet-stream';
  const date = new Date().toUTCString();
  const ossHeaders = {
    'x-oss-object-acl': 'public-read',
    'x-oss-storage-class': 'Standard',
    ...(stsToken ? { 'x-oss-security-token': stsToken } : {}),
  };
  const canonicalHeaders = Object.entries(ossHeaders)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `${name}:${value}\n`)
    .join('');
  const resource = `/${bucket}/${key}`;
  const stringToSign = ['PUT', contentMd5, contentType, date, `${canonicalHeaders}${resource}`].join('\n');
  const signature = createHmac('sha1', accessKeySecret).update(stringToSign).digest('base64');

  const headers = {
    Authorization: `OSS ${accessKeyID}:${signature}`,
    Date: date,
    Host: host,
    'Content-Type': contentType,
    'Content-Length': content.length,
    'Content-MD5': contentMd5,
    'Cache-Control': cacheControlFor(key),
    ...ossHeaders,
  };

  await new Promise((resolve, reject) => {
    const request = https.request(
      {
        method: 'PUT',
        host,
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
          reject(new Error(`OSS upload failed for ${key}: HTTP ${response.statusCode}`));
        });
      }
    );
    request.setTimeout(30000, () => request.destroy(new Error(`OSS upload timed out for ${key}`)));
    request.on('error', reject);
    request.end(content);
  });

  return key;
}

async function configureWebsite({ accessKeyID, accessKeySecret, stsToken }) {
  const contentType = 'application/xml';
  const content = Buffer.from(
    '<WebsiteConfiguration><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key><HttpStatus>404</HttpStatus></ErrorDocument></WebsiteConfiguration>',
    'utf8',
  );
  const contentMd5 = createHash('md5').update(content).digest('base64');
  const date = new Date().toUTCString();
  const ossHeaders = stsToken ? { 'x-oss-security-token': stsToken } : {};
  const canonicalHeaders = Object.entries(ossHeaders)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `${name}:${value}\n`)
    .join('');
  const resource = `/${bucket}/?website`;
  const stringToSign = ['PUT', contentMd5, contentType, date, `${canonicalHeaders}${resource}`].join('\n');
  const signature = createHmac('sha1', accessKeySecret).update(stringToSign).digest('base64');
  await new Promise((resolve, reject) => {
    const request = https.request({
      method: 'PUT',
      host,
      path: '/?website',
      headers: {
        Authorization: `OSS ${accessKeyID}:${signature}`,
        Date: date,
        Host: host,
        'Content-Type': contentType,
        'Content-Length': content.length,
        'Content-MD5': contentMd5,
        ...ossHeaders,
      },
    }, (response) => {
      const chunks = [];
      let bodyLength = 0;
      response.on('data', (chunk) => {
        if (bodyLength >= 2048) return;
        const remaining = 2048 - bodyLength;
        const limited = chunk.subarray(0, remaining);
        chunks.push(limited);
        bodyLength += limited.length;
      });
      response.on('end', () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve();
          return;
        }
        const body = Buffer.concat(chunks).toString('utf8');
        const errorCode = body.match(/<Code>([^<]+)<\/Code>/)?.[1];
        const requestId = response.headers['x-oss-request-id'] ?? 'unavailable';
        const detail = errorCode ? `OSS Code ${errorCode}` : `response ${body || 'unavailable'}`;
        reject(new Error(`OSS website configuration failed: HTTP ${response.statusCode}; OSS Request ID ${requestId}; ${detail}`));
      });
    });
    request.setTimeout(30000, () => request.destroy(new Error('OSS website configuration timed out')));
    request.on('error', reject);
    request.end(content);
  });
  console.log('OSS website configured: index.html / 404.html (404)');
}

async function deployObjects(config) {
  const files = await listFiles(distDir);
  const uploadedKeys = [];
  for (const file of files) {
    const key = await putObject(config, file);
    uploadedKeys.push(key);
    console.log(`uploaded ${key}`);

    const relativeKey = toObjectKey(file);
    if (relativeKey.endsWith('/index.html')) {
      const routeKey = relativeKey.slice(0, -'index.html'.length);
      const routeKeyWithoutSlash = routeKey.slice(0, -1);
      for (const aliasKey of [routeKey, routeKeyWithoutSlash]) {
        await putObject(config, file, aliasKey);
        uploadedKeys.push(aliasKey);
        console.log(`uploaded ${aliasKey}`);
      }
    }
  }
  console.log(`OSS deploy complete: ${uploadedKeys.length} objects from ${files.length} files`);
}

const mode = getDeployMode(process.argv.slice(2));
const configText = await readFile(configPath, 'utf8');
const config = parseConfig(configText);
if (!config.accessKeyID || !config.accessKeySecret) {
  throw new Error('Missing accessKeyID or accessKeySecret in .ossutilconfig');
}

await runDeployMode(mode, {
  deployObjects: () => deployObjects(config),
  configureWebsite: () => configureWebsite(config),
});
