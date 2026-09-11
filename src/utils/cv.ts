import type { Language } from '../data/content';

const cvByLanguage: Record<Language, { href: string; download: string }> = {
  pt: {
    href: '/assets/cv-falopes-2026-ptbr.pdf',
    download: 'fabio-lopes-cv-2026-pt-br.pdf',
  },
  en: {
    href: '/assets/cv-falopes-2026-en.pdf',
    download: 'fabio-lopes-cv-2026-en.pdf',
  },
  es: {
    href: '/assets/cv-falopes-2026-es.pdf',
    download: 'fabio-lopes-cv-2026-es.pdf',
  },
};

export function getCvDownload(language: Language) {
  return cvByLanguage[language];
}
