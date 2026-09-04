import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { getSeoConfig, getSitemapUrls, publicRoutes } from './seo';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function render(pathname: string) {
  return renderToString(
    <StrictMode>
      <App initialPath={pathname} />
    </StrictMode>,
  );
}

export function renderHead(pathname: string) {
  const config = getSeoConfig(pathname);
  const robots = config.robots ?? 'index, follow';
  const ogTitle = config.ogTitle ?? config.title;
  const ogDescription = config.ogDescription ?? config.description;
  const twitterCard = config.twitterCard ?? 'summary_large_image';

  return [
    `<title>${escapeHtml(config.title)}</title>`,
    `<meta name="description" content="${escapeHtml(config.description)}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    `<meta name="googlebot" content="${escapeHtml(robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(config.canonical)}" />`,
    '<meta property="og:locale" content="pt_BR" />',
    '<meta property="og:site_name" content="Fabio Lopes" />',
    `<meta property="og:type" content="${escapeHtml(config.ogType ?? 'website')}" />`,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(ogDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(config.canonical)}" />`,
    config.ogImage ? `<meta property="og:image" content="${escapeHtml(config.ogImage)}" />` : '',
    `<meta name="twitter:card" content="${escapeHtml(twitterCard)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(ogDescription)}" />`,
    config.ogImage ? `<meta name="twitter:image" content="${escapeHtml(config.ogImage)}" />` : '',
    ...(config.structuredData ?? []).map(
      (data) => `<script type="application/ld+json" data-seo-jsonld="true">${jsonLd(data)}</script>`,
    ),
  ]
    .filter(Boolean)
    .join('\n    ');
}

export { getSitemapUrls, publicRoutes };
