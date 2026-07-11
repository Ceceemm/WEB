import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageRoutes } from '../dist-ssr/entry-server.js';
import { getSitemapXml, render } from '../dist-ssr/entry-server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');
const distDir = path.join(appRoot, 'dist');
const templatePath = path.join(distDir, 'index.html');
const template = await readFile(templatePath, 'utf8');

function outputPathFor(routePath) {
  if (routePath === '/') {
    return templatePath;
  }

  return path.join(distDir, routePath.replace(/^\//, ''));
}

async function writePage(routePath) {
  const { appHtml, headHtml } = render(routePath);
  const html = template
    .replace(/<!--app-head-start-->[\s\S]*?<!--app-head-end-->/, `<!--app-head-start-->\n    ${headHtml}\n    <!--app-head-end-->`)
    .replace('<!--app-html-->', appHtml);
  const outPath = outputPathFor(routePath);

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');
}

for (const route of pageRoutes) {
  await writePage(route.path);
}

await writePage('/404.html');

await writeFile(path.join(distDir, 'sitemap.xml'), getSitemapXml(), 'utf8');
