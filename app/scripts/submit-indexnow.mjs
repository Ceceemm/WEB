import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, '..');
const distDir = path.join(appDir, 'dist');
const publicDir = path.join(appDir, 'public');

const host = 'aqztjx.top';
const siteUrl = `https://${host}`;
const keyFileName = 'b00aa3db8702439f8eab75fdb067f3c4.txt';
const endpoint = 'https://www.bing.com/indexnow';
const dryRun = process.argv.includes('--dry-run');

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function assertProjectUrl(url) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || parsed.hostname !== host) {
    throw new Error(`Unexpected URL in sitemap: ${url}`);
  }
}

const [key, sitemapXml] = await Promise.all([
  readFile(path.join(publicDir, keyFileName), 'utf8').then((text) => text.trim()),
  readFile(path.join(distDir, 'sitemap.xml'), 'utf8'),
]);

const urlList = extractSitemapUrls(sitemapXml);
if (urlList.length === 0) {
  throw new Error('No URLs found in dist/sitemap.xml. Run npm run build first.');
}
urlList.forEach(assertProjectUrl);

const payload = {
  host,
  key,
  keyLocation: `${siteUrl}/${keyFileName}`,
  urlList,
};

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

const responseText = await response.text();
if (!response.ok) {
  throw new Error(
    `IndexNow submission failed: HTTP ${response.status}${responseText ? ` ${responseText}` : ''}`,
  );
}

console.log(`IndexNow submitted ${urlList.length} URLs to Bing.`);
