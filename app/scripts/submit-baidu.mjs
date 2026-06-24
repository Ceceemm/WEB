import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, '..');
const distDir = path.join(appDir, 'dist');

const host = 'aqztjx.top';
const siteUrl = `https://${host}`;
const baiduSite = host;
const token = process.env.BAIDU_PUSH_TOKEN;
const endpoint = process.env.BAIDU_PUSH_ENDPOINT ?? 'http://data.zz.baidu.com/urls';
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

const sitemapXml = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
const urlList = extractSitemapUrls(sitemapXml);

if (urlList.length === 0) {
  throw new Error('No URLs found in dist/sitemap.xml. Run npm run build first.');
}

urlList.forEach(assertProjectUrl);

if (dryRun) {
  console.log(`Baidu push dry run for ${siteUrl}:`);
  for (const url of urlList) {
    console.log(url);
  }
  process.exit(0);
}

if (!token) {
  throw new Error('Missing BAIDU_PUSH_TOKEN environment variable.');
}

const submitUrl = new URL(endpoint);
submitUrl.searchParams.set('site', baiduSite);
submitUrl.searchParams.set('token', token);

const response = await fetch(submitUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  body: urlList.join('\n'),
});

const responseText = await response.text();
if (!response.ok) {
  throw new Error(
    `Baidu submission failed: HTTP ${response.status}${responseText ? ` ${responseText}` : ''}`,
  );
}

let result;
try {
  result = JSON.parse(responseText);
} catch {
  result = responseText;
}

console.log('Baidu submission result:');
console.log(JSON.stringify(result, null, 2));
