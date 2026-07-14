import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { languages, Language, projectSlugs } from '../data/content';
import { useI18n } from '../i18n';
import { openContactForm } from '../utils/contact';
import { Button } from './Button';
import { Logo } from './Logo';

const languageFlags: Record<Language, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸',
};

function isProjectsItem(item: string) {
  const normalized = item
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return normalized.includes('project') || normalized.includes('proyecto') || normalized.includes('projet');
}

function sectionId(item: string) {
  const normalized = item
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (normalized.includes('serv')) return 'servicos';
  if (normalized.includes('project') || normalized.includes('proyecto') || normalized.includes('projet')) return 'projetos';
  if (normalized.includes('about') || normalized.includes('sobre')) return 'sobre';

  return 'home';
}

function FlagIcon({ language }: { language: Language }) {
  if (language === 'pt') {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-[2px] shadow-[inset_0_0_0_1px_rgba(8,31,51,0.12)]" aria-hidden="true">
        <rect width="24" height="16" fill="#229E45" />
        <path d="M12 2 21 8 12 14 3 8Z" fill="#F8D348" />
        <circle cx="12" cy="8" r="3.4" fill="#2B4EA2" />
        <path d="M8.8 7.1c2.4-.5 4.4-.1 6.4 1" stroke="#fff" strokeWidth="0.8" fill="none" />
      </svg>
    );
  }

  if (language === 'en') {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-[2px] shadow-[inset_0_0_0_1px_rgba(8,31,51,0.12)]" aria-hidden="true">
        <rect width="24" height="16" fill="#fff" />
        <path d="M0 0h24v1.23H0Zm0 2.46h24v1.23H0Zm0 2.46h24v1.23H0Zm0 2.46h24v1.23H0Zm0 2.46h24v1.23H0Zm0 2.46h24v1.23H0Zm0 2.47h24V16H0Z" fill="#B22234" />
        <rect width="10.6" height="8.6" fill="#3C3B6E" />
        <g fill="#fff">
          <circle cx="1.4" cy="1.2" r="0.35" />
          <circle cx="3.2" cy="1.2" r="0.35" />
          <circle cx="5" cy="1.2" r="0.35" />
          <circle cx="6.8" cy="1.2" r="0.35" />
          <circle cx="8.6" cy="1.2" r="0.35" />
          <circle cx="2.3" cy="2.7" r="0.35" />
          <circle cx="4.1" cy="2.7" r="0.35" />
          <circle cx="5.9" cy="2.7" r="0.35" />
          <circle cx="7.7" cy="2.7" r="0.35" />
          <circle cx="1.4" cy="4.2" r="0.35" />
          <circle cx="3.2" cy="4.2" r="0.35" />
          <circle cx="5" cy="4.2" r="0.35" />
          <circle cx="6.8" cy="4.2" r="0.35" />
          <circle cx="8.6" cy="4.2" r="0.35" />
          <circle cx="2.3" cy="5.7" r="0.35" />
          <circle cx="4.1" cy="5.7" r="0.35" />
          <circle cx="5.9" cy="5.7" r="0.35" />
          <circle cx="7.7" cy="5.7" r="0.35" />
          <circle cx="1.4" cy="7.2" r="0.35" />
          <circle cx="3.2" cy="7.2" r="0.35" />
          <circle cx="5" cy="7.2" r="0.35" />
          <circle cx="6.8" cy="7.2" r="0.35" />
          <circle cx="8.6" cy="7.2" r="0.35" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-[2px] shadow-[inset_0_0_0_1px_rgba(8,31,51,0.12)]" aria-hidden="true">
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
      <rect x="5" y="6.1" width="2.2" height="3.8" rx="0.3" fill="#AA151B" />
    </svg>
  );
}

function LanguageDropdown({ controlClasses, className = '' }: { controlClasses: string; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setIsOpen(false);
  }

  return (
    <div
      className={`relative ${className}`}
      onBlur={(event) => {
        const nextFocus = event.relatedTarget as Node | null;
        if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={`${controlClasses} min-w-[92px] justify-between`}
        aria-label={t.actions.languageLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <FlagIcon language={language} />
        <span>{languages[language]}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t.actions.languageLabel}
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-full overflow-hidden rounded-md border border-[var(--blue-padrao)] bg-white py-1 shadow-soft dark:border-[var(--blue-border)] dark:bg-[var(--fundo)]"
        >
          {(Object.keys(languages) as Language[]).map((item) => (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={language === item}
              onClick={() => handleLanguageChange(item)}
              className="flex h-10 w-full items-center gap-2 px-3 font-display text-xs font-semibold text-[var(--blue-padrao)] transition hover:bg-[var(--blue-claro)] dark:text-[var(--blue-border)] dark:hover:bg-[var(--surface-hover)]"
            >
              <FlagIcon language={item} />
              {languages[item]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const ThemeIcon = isDark ? Moon : Sun;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const controlClasses =
    'inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[var(--blue-padrao)] bg-white px-3 font-display text-xs font-semibold tracking-[0.02em] text-[var(--blue-padrao)] transition-colors duration-300 hover:border-[var(--blue-escuro)] hover:text-[var(--blue-escuro)] dark:border-[var(--blue-border)] dark:bg-transparent dark:text-[var(--blue-border)] dark:hover:border-[var(--blue-border)] dark:hover:bg-[var(--surface-hover)] dark:hover:text-[var(--blue-border)]';

  return (
    <header className="sticky top-0 z-50 border-b border-ocean/10 bg-white/90 backdrop-blur-xl dark:border-[color:rgba(20,51,79,0.6)] dark:bg-[color:rgba(11,17,32,0.95)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-semibold text-ink/70 md:flex dark:text-[var(--cinza-claro)]">
          {t.navItems.map((item) =>
            isProjectsItem(item) ? (
              <div key={item} className="group relative py-5">
                <a
                  href="/#projetos"
                  className="inline-flex items-center gap-1 transition-colors duration-300 hover:text-teal dark:hover:text-[var(--tradewind-border)]"
                >
                  {item}
                  <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                </a>
                <div className="invisible absolute left-1/2 top-[calc(100%-6px)] z-50 w-64 -translate-x-1/2 translate-y-2 rounded-md border border-ocean/10 bg-white p-2 opacity-0 shadow-soft transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-[var(--blue-border)] dark:bg-[var(--fundo)]">
                  {t.projects.map((project, index) => (
                    <a
                      key={project.title}
                      href={`/projetos/${projectSlugs[index]}`}
                      className="block rounded px-3 py-3 font-display text-sm font-bold text-[var(--blue-padrao)] transition hover:bg-[var(--blue-claro)] dark:text-white dark:hover:bg-white/10"
                    >
                      {project.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item}
                href={`/#${sectionId(item)}`}
                className="transition-colors duration-300 hover:text-teal dark:hover:text-[var(--tradewind-border)]"
              >
                {item}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button type="button" onClick={() => setIsDark((value) => !value)} className={controlClasses}>
            <ThemeIcon size={16} />
            {isDark ? t.actions.dark : t.actions.light}
          </button>
          <LanguageDropdown controlClasses={controlClasses} />
          <Button type="button" onClick={openContactForm} className="min-h-12 px-3 py-2 text-xs">
            {t.actions.talk}
          </Button>
        </div>

        <button
          type="button"
          aria-label={isOpen ? t.actions.closeMenu : t.actions.openMenu}
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-12 w-12 items-center justify-center rounded-md border border-ocean/15 text-ocean md:hidden dark:border-[var(--blue-border)] dark:text-[var(--blue-border)]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-ocean/10 bg-white px-5 py-4 md:hidden dark:border-[color:rgba(20,51,79,0.6)] dark:bg-[var(--fundo)]">
          <nav className="mx-auto grid max-w-6xl gap-3 text-sm font-bold text-[var(--blue-padrao)] dark:text-[var(--cinza-claro)]">
            {t.navItems.map((item) =>
              isProjectsItem(item) ? (
                <div key={item} className="grid gap-2">
                  <a
                    href="/#projetos"
                    onClick={() => setIsOpen(false)}
                    className="transition-colors duration-300 hover:text-teal dark:hover:text-[var(--tradewind-border)]"
                  >
                    {item}
                  </a>
                  <div className="grid gap-1 pl-4">
                    {t.projects.map((project, index) => (
                      <a
                        key={project.title}
                        href={`/projetos/${projectSlugs[index]}`}
                        onClick={() => setIsOpen(false)}
                        className="py-1 font-display text-xs font-semibold text-[var(--cinza-escuro)] transition-colors duration-300 hover:text-teal dark:text-white/70 dark:hover:text-[var(--tradewind-border)]"
                      >
                        {project.title}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item}
                  href={`/#${sectionId(item)}`}
                  onClick={() => setIsOpen(false)}
                  className="transition-colors duration-300 hover:text-teal dark:hover:text-[var(--tradewind-border)]"
                >
                  {item}
                </a>
              ),
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setIsDark((value) => !value)} className={controlClasses}>
                <ThemeIcon size={16} />
                {isDark ? t.actions.dark : t.actions.light}
              </button>
              <LanguageDropdown controlClasses={controlClasses} className="w-full" />
            </div>
            <div className="mt-1 flex gap-2">
              <Button
                type="button"
                onClick={() => {
                  openContactForm();
                  setIsOpen(false);
                }}
                className="w-full"
              >
                {t.actions.talk}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
