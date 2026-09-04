import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntryCandidates = [path.join(distDir, 'server', 'entry-server.js'), path.join(distDir, 'entry-server.js')];

const template = await readFile(templatePath, 'utf8');
const serverEntry = await findExistingFile(serverEntryCandidates);
const serverEntryUrl = pathToFileURL(serverEntry);
serverEntryUrl.searchParams.set('v', String(Date.now()));

const { render, renderHead, publicRoutes, getSitemapUrls } = await import(serverEntryUrl.href);
const routes = [...publicRoutes, '/404'];

async function findExistingFile(candidates) {
  for (const candidate of candidates) {
    try {
      const file = await stat(candidate);
      if (file.isFile()) {
        return candidate;
      }
    } catch {
      // Try the next Vite SSR output location.
    }
  }

  throw new Error(`Could not find SSR entry. Checked: ${candidates.join(', ')}`);
}

function outputPath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }

  if (route === '/404') {
    return path.join(distDir, '404.html');
  }

  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

function cleanUrlOutputPath(route) {
  if (route === '/' || route === '/404') {
    return null;
  }

  return path.join(distDir, `${route.replace(/^\//, '')}.html`);
}

function buildHtml(route) {
  return template
    .replace('<!--app-head-->', renderHead(route))
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
}

for (const route of routes) {
  const html = buildHtml(route);
  const filePath = outputPath(route);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html, 'utf8');

  const cleanFilePath = cleanUrlOutputPath(route);
  if (cleanFilePath) {
    await mkdir(path.dirname(cleanFilePath), { recursive: true });
    await writeFile(cleanFilePath, html, 'utf8');
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${getSitemapUrls()
  .map((url) => `  <url><loc>${url}</loc></url>`)
  .join('\n')}
</urlset>
`;

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(
  path.join(distDir, 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', 'Sitemap: https://falopes.com.br/sitemap.xml', ''].join('\n'),
  'utf8',
);
