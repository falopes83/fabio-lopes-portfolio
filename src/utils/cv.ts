import type { Language } from '../data/content';

const cvByLanguage: Record<Language, { href: string; download: string }> = {
  pt: {
    href: '/assets/cv-falopes-2026-ptbr.pdf',
    download: 'fabio-lopes-cv-2026-pt-br.pdf',
  },
  en: {
    href: '/assets/CV-2026-EN.pdf',
    download: 'fabio-lopes-cv-2026-en.pdf',
  },
  es: {
    href: '/assets/CV-2026-EN.pdf',
    download: 'fabio-lopes-cv-2026-en.pdf',
  },
};

export function getCvDownload(language: Language) {
  return cvByLanguage[language];
}
