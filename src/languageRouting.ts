import { Language, projectSlugs } from './data/content';

export const supportedLanguages: Language[] = ['pt', 'en', 'es'];
export const languageStorageKey = 'language';

export const htmlLangByLanguage: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

export const ogLocaleByLanguage: Record<Language, string> = {
  pt: 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
};

export const contentRoutes = ['/', ...projectSlugs.map((slug) => `/projetos/${slug}`)];

export type RouteInfo = {
  pathname: string;
  language: Language | null;
  contentPath: string;
  hasExplicitLanguage: boolean;
};

export function isLanguage(value: string | null | undefined): value is Language {
  return value === 'pt' || value === 'en' || value === 'es';
}

export function normalizeContentPath(pathname: string) {
  const cleanPath = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  return cleanPath;
}

export function getRouteInfo(pathname: string): RouteInfo {
  const normalized = normalizeContentPath(pathname);
  const [, firstSegment = '', ...rest] = normalized.split('/');
  const maybeLanguage = firstSegment.toLowerCase();

  if (isLanguage(maybeLanguage)) {
    const contentPath = `/${rest.join('/')}`.replace(/\/+$/, '') || '/';

    return {
      pathname: normalized,
      language: maybeLanguage,
      contentPath,
      hasExplicitLanguage: true,
    };
  }

  return {
    pathname: normalized,
    language: null,
    contentPath: normalized,
    hasExplicitLanguage: false,
  };
}

export function isKnownContentPath(contentPath: string) {
  return contentRoutes.includes(normalizeContentPath(contentPath));
}

export function getLocalizedPath(language: Language, contentPath: string) {
  const normalized = normalizeContentPath(contentPath);
  return normalized === '/' ? `/${language}` : `/${language}${normalized}`;
}

export function getLocalizedHref(language: Language, contentPath: string, hash = '') {
  return `${getLocalizedPath(language, contentPath)}${hash}`;
}

export function getEquivalentPath(pathname: string, language: Language) {
  const routeInfo = getRouteInfo(pathname);

  if (!isKnownContentPath(routeInfo.contentPath)) {
    return getLocalizedPath(language, '/');
  }

  return getLocalizedPath(language, routeInfo.contentPath);
}

export function matchBrowserLanguage(value: string | null | undefined): Language | null {
  if (!value) return null;

  const baseLanguage = value.toLowerCase().split('-')[0];
  return isLanguage(baseLanguage) ? baseLanguage : null;
}

export function detectBrowserLanguage(): Language | null {
  if (typeof navigator === 'undefined') return null;

  const preferences = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const preference of preferences) {
    const language = matchBrowserLanguage(preference);
    if (language) return language;
  }

  return null;
}

export function readSavedLanguage(): Language | null {
  if (typeof window === 'undefined') return null;

  try {
    const savedLanguage = window.localStorage.getItem(languageStorageKey);
    return isLanguage(savedLanguage) ? savedLanguage : null;
  } catch {
    return null;
  }
}

export function saveLanguagePreference(language: Language) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(languageStorageKey, language);
  } catch {
    // Storage can be disabled; language navigation must continue to work.
  }
}
