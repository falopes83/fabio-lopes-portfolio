import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { dictionary, Language } from './data/content';
import {
  detectBrowserLanguage,
  getEquivalentPath,
  getRouteInfo,
  htmlLangByLanguage,
  isKnownContentPath,
  readSavedLanguage,
  saveLanguagePreference,
} from './languageRouting';

type I18nContextValue = {
  language: Language;
  isLanguageModalOpen: boolean;
  setLanguage: (language: Language) => void;
  chooseLanguage: (language: Language) => void;
  t: (typeof dictionary)[Language];
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLanguage(initialPath: string): { language: Language; shouldShowModal: boolean } {
  if (typeof window === 'undefined') {
    const serverRoute = getRouteInfo(initialPath);
    return { language: serverRoute.language ?? 'pt', shouldShowModal: false };
  }

  const route = getRouteInfo(window.location.pathname);
  if (route.hasExplicitLanguage && route.language) {
    return { language: route.language, shouldShowModal: false };
  }

  const savedLanguage = readSavedLanguage();
  if (savedLanguage) {
    return { language: savedLanguage, shouldShowModal: false };
  }

  const browserLanguage = detectBrowserLanguage();
  if (browserLanguage) {
    return { language: browserLanguage, shouldShowModal: false };
  }

  return { language: 'pt', shouldShowModal: isKnownContentPath(route.contentPath) };
}

export function I18nProvider({ children, initialPath = '/' }: { children: ReactNode; initialPath?: string }) {
  const initialLanguage = useMemo(() => getInitialLanguage(initialPath), [initialPath]);
  const [language, setLanguageState] = useState<Language>(initialLanguage.language);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(initialLanguage.shouldShowModal);
  const hasHandledImplicitRoute = useRef(false);

  useEffect(() => {
    document.documentElement.lang = htmlLangByLanguage[language];
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined' || hasHandledImplicitRoute.current) return;

    hasHandledImplicitRoute.current = true;
    const route = getRouteInfo(window.location.pathname);
    if (route.hasExplicitLanguage || !isKnownContentPath(route.contentPath) || isLanguageModalOpen) return;

    const targetPath = getEquivalentPath(window.location.pathname, language);
    const nextUrl = `${targetPath}${window.location.search}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.location.replace(nextUrl);
    }
  }, [isLanguageModalOpen, language]);

  function chooseLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    setIsLanguageModalOpen(false);
    saveLanguagePreference(nextLanguage);

    if (typeof window === 'undefined') return;

    const route = getRouteInfo(window.location.pathname);
    const hasEquivalentPage = isKnownContentPath(route.contentPath);
    const targetPath = getEquivalentPath(window.location.pathname, nextLanguage);
    const nextUrl = hasEquivalentPage ? `${targetPath}${window.location.search}${window.location.hash}` : targetPath;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.location.assign(nextUrl);
    }
  }

  const value = useMemo(
    () => ({
      language,
      isLanguageModalOpen,
      setLanguage: chooseLanguage,
      chooseLanguage,
      t: dictionary[language],
    }),
    [isLanguageModalOpen, language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }

  return context;
}
