import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { dictionary, Language } from './data/content';

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof dictionary)[Language];
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === 'pt' || value === 'en' || value === 'es';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = window.localStorage.getItem('language');
    return isLanguage(saved) ? saved : 'pt';
  });

  useEffect(() => {
    window.localStorage.setItem('language', language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: dictionary[language],
    }),
    [language],
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
