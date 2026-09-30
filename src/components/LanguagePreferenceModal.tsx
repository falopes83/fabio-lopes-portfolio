import { useEffect, useRef } from 'react';
import { Language } from '../data/content';
import { useI18n } from '../i18n';

const languageOptions: Array<{ language: Language; label: string }> = [
  { language: 'pt', label: 'Português' },
  { language: 'en', label: 'English' },
  { language: 'es', label: 'Español' },
];

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled') && element.tabIndex !== -1);
}

export function LanguagePreferenceModal() {
  const { chooseLanguage, isLanguageModalOpen } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLanguageModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableElements = dialogRef.current ? getFocusableElements(dialogRef.current) : [];
    focusableElements[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const elements = getFocusableElements(dialogRef.current);
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLanguageModalOpen]);

  if (!isLanguageModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-svh items-center justify-center bg-[color:rgba(8,31,51,0.92)] px-5 py-8 backdrop-blur-md"
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-modal-title"
        aria-describedby="language-modal-description"
        className="w-full max-w-xl rounded-md border border-white/15 bg-white p-6 text-[var(--blue-escuro)] shadow-soft outline-none dark:border-[var(--blue-border)] dark:bg-[var(--fundo)] dark:text-white sm:p-8"
      >
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--tradewind-escuro)] dark:text-[var(--tradewind-border)]">
          Fabio Lopes
        </p>
        <h2 id="language-modal-title" className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
          Choose your preferred language
        </h2>
        <p id="language-modal-description" className="mt-4 max-w-md font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-white/72">
          This website is available in Portuguese, English and Spanish.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {languageOptions.map((option) => (
            <button
              key={option.language}
              type="button"
              onClick={() => chooseLanguage(option.language)}
              className="min-h-12 rounded-md bg-[var(--blue-padrao)] px-4 py-3 font-display text-sm font-extrabold text-white transition hover:bg-[var(--blue-escuro)] focus:outline-none focus:ring-4 focus:ring-[var(--tradewind-claro)] dark:bg-[var(--blue-background)] dark:text-[var(--blue-escuro)] dark:hover:bg-[var(--tradewind-border)]"
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => chooseLanguage('en')}
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md px-2 font-display text-sm font-semibold text-[var(--cinza-escuro)] underline decoration-[var(--tradewind-padrao)] underline-offset-4 transition hover:text-[var(--blue-escuro)] focus:outline-none focus:ring-4 focus:ring-[var(--tradewind-claro)] dark:text-white/64 dark:hover:text-white"
        >
          Continue in English
        </button>
      </div>
    </div>
  );
}
