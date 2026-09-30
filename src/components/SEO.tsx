import { useEffect } from 'react';
import type { SeoConfig } from '../seo';

type SEOProps = {
  config: SeoConfig;
};

function upsertMeta(selector: string, create: () => HTMLMetaElement | HTMLLinkElement | HTMLScriptElement) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | HTMLScriptElement | null;

  if (!element) {
    element = create();
    document.head.appendChild(element);
  }

  return element;
}

function setMetaName(name: string, content: string) {
  const element = upsertMeta(`meta[name="${name}"]`, () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    return meta;
  });
  element.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  const element = upsertMeta(`meta[property="${property}"]`, () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', property);
    return meta;
  });
  element.setAttribute('content', content);
}

function setCanonical(href: string) {
  const element = upsertMeta('link[rel="canonical"]', () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    return link;
  });
  element.setAttribute('href', href);
}

function syncAlternateLinks(config: SeoConfig) {
  document.head.querySelectorAll('link[data-seo-alternate="true"]').forEach((link) => link.remove());

  config.alternates.forEach((alternate) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = alternate.hrefLang;
    link.href = alternate.href;
    link.dataset.seoAlternate = 'true';
    document.head.appendChild(link);
  });
}

export function SEO({ config }: SEOProps) {
  useEffect(() => {
    document.title = config.title;
    document.documentElement.lang = config.htmlLang;

    setMetaName('description', config.description);
    setMetaName('robots', config.robots ?? 'index, follow');
    setMetaName('googlebot', config.robots ?? 'index, follow');
    setCanonical(config.canonical);
    syncAlternateLinks(config);

    setMetaProperty('og:locale', config.language === 'pt' ? 'pt_BR' : config.language === 'en' ? 'en_US' : 'es_ES');
    setMetaProperty('og:site_name', 'Fabio Lopes');
    setMetaProperty('og:type', config.ogType ?? 'website');
    setMetaProperty('og:title', config.ogTitle ?? config.title);
    setMetaProperty('og:description', config.ogDescription ?? config.description);
    setMetaProperty('og:url', config.canonical);
    setMetaProperty('og:image', config.ogImage ?? '');

    setMetaName('twitter:card', config.twitterCard ?? 'summary_large_image');
    setMetaName('twitter:title', config.ogTitle ?? config.title);
    setMetaName('twitter:description', config.ogDescription ?? config.description);
    setMetaName('twitter:image', config.ogImage ?? '');

    document.head.querySelectorAll('script[data-seo-jsonld="true"]').forEach((script) => script.remove());
    config.structuredData?.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });
  }, [config]);

  return null;
}
