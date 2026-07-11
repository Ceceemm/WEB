/**
 * OSS Orphan Object Reporter
 *
 * Lists objects in the OSS bucket that no longer exist in the local dist/
 * directory. These "orphan" objects accumulate over time because deploy-oss.mjs
 * only uploads (PutObject) and never deletes.
 *
 * This script is READ-ONLY: it lists orphans but does NOT delete them.
 * Review the output and manually delete if needed.
 *
 * Usage:
 *   node scripts/oss-orphans.mjs
 *
 * Requires ~/.ossutilconfig with accessKeyID and accessKeySecret.
 */

import { createHmac } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, '..');
const distDir = path.join(appDir, 'dist');
const configPath = path.join(process.env.USERPROFILE ?? process.env.HOME ?? '', '.ossutilconfig');

const bucket = 'aqztjx-site';
const endpoint = 'oss-cn-beijing.aliyuncs.com';
const host = `${bucket}.${endpoint}`;

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

/**
 * Generate all OSS object keys that deploy-oss.mjs would create for a given
 * dist file, including route aliases (e.g. /chanpin/index.html also creates
 * /chanpin/ and /chanpin).
 */
function expandKeys(filePath) {
  const key = toObjectKey(filePath);
  const keys = [key];

  if (key.endsWith('/index.html')) {
    const routeKey = key.slice(0, -'index.html'.length); // /chanpin/
    const routeKeyWithoutSlash = routeKey.slice(0, -1); // /chanpin
    keys.push(routeKey, routeKeyWithoutSlash);
  }

  return keys;
}

async function listOssObjects(credentials) {
  const allKeys = [];
  let marker = '';

  while (true) {
    const date = new Date().toUTCString();
    const resource = `/${bucket}/`;
    const ossHeaders = credentials.stsToken
      ? { 'x-oss-security-token': credentials.stsToken }
      : {};
    const canonicalHeaders = Object.entries(ossHeaders)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, value]) => `${name}:${value}\n`)
      .join('');
    const stringToSign = ['GET', '', '', date, `${canonicalHeaders}${resource}`].join('\n');
    const signature = createHmac('sha1', credentials.accessKeySecret)
      .update(stringToSign)
      .digest('base64');

    const queryString = marker
      ? `?max-keys=1000&marker=${encodeURIComponent(marker)}`
      : '?max-keys=1000';

    const response = await new Promise((resolve, reject) => {
      const req = https.request(
        {
          method: 'GET',
          host,
          path: `/${queryString}`,
          headers: {
            Authorization: `OSS ${credentials.accessKeyID}:${signature}`,
            Date: date,
            Host: host,
            ...ossHeaders,
          },
        },
        (res) => {
          let body = '';
          res.on('data', (chunk) => { body += chunk; });
          res.on('end', () => resolve({ statusCode: res.statusCode, body }));
        }
      );
      req.setTimeout(30000, () => req.destroy(new Error('OSS object listing timed out')));
      req.on('error', reject);
      req.end();
    });

    if (response.statusCode !== 200) {
      throw new Error(`OSS ListObjects failed: HTTP ${response.statusCode}\n${response.body}`);
    }

    // Parse XML response (simple regex — OSS ListBucketResult is flat)
    const keyRegex = /<Key>([^<]*)<\/Key>/g;
    let match;
    while ((match = keyRegex.exec(response.body)) !== null) {
      allKeys.push(match[1]);
    }

    const isTruncated = /<IsTruncated>true<\/IsTruncated>/.test(response.body);
    if (!isTruncated) break;

    const markerMatch = /<NextMarker>([^<]*)<\/NextMarker>/.exec(response.body);
    marker = markerMatch ? markerMatch[1] : '';
    if (!marker) break;
  }

  return allKeys;
}

// --- Main ---

const configText = await readFile(configPath, 'utf8');
const config = parseConfig(configText);
if (!config.accessKeyID || !config.accessKeySecret) {
  throw new Error('Missing accessKeyID or accessKeySecret in .ossutilconfig');
}

console.log('Scanning dist/ directory...');
const distFiles = await listFiles(distDir);
const distKeys = new Set();
for (const file of distFiles) {
  for (const key of expandKeys(file)) {
    distKeys.add(key);
  }
}
console.log(`Found ${distFiles.length} dist files → ${distKeys.size} expected OSS objects (incl. route aliases)`);

console.log('Listing OSS bucket objects...');
const ossKeys = await listOssObjects(config);
console.log(`Found ${ossKeys.length} objects in OSS bucket "${bucket}"`);

const orphans = ossKeys.filter((key) => !distKeys.has(key));

if (orphans.length === 0) {
  console.log('\n✓ No orphan objects found. OSS is in sync with dist/.');
} else {
  console.log(`\n⚠ Found ${orphans.length} orphan object(s) in OSS (not in current dist/):`);
  console.log('  These may be from old deployments. Review and delete manually if needed.');
  console.log('  ──────────────────────────────────────────────');
  for (const key of orphans) {
    console.log(`  ${key}`);
  }
  console.log('  ──────────────────────────────────────────────');
  console.log(`\nTo delete: use ossutil or Alibaba Cloud console.`);
  console.log(`Example: ossutil rm oss://${bucket}/<orphan-key>`);
}
