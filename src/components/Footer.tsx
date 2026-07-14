import { useI18n } from '../i18n';
import { openContactForm } from '../utils/contact';
import { Button } from './Button';
import { Logo } from './Logo';

type SocialType = 'linkedin' | 'medium' | 'mail';

function SocialSvg({ type }: { type: SocialType }) {
  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.36 8.08h4.25V23H.36V8.08ZM8.12 8.08h4.07v2.04h.06c.57-1.08 1.96-2.22 4.03-2.22 4.31 0 5.1 2.84 5.1 6.53V23h-4.25v-7.6c0-1.81-.03-4.14-2.52-4.14-2.53 0-2.92 1.97-2.92 4V23H7.45V8.08h.67Z" />
      </svg>
    );
  }

  if (type === 'medium') {
    return (
      <svg viewBox="0 0 48 24" className="h-[16px] w-6" fill="currentColor" aria-hidden="true">
        <ellipse cx="11" cy="12" rx="10" ry="10" />
        <ellipse cx="30" cy="12" rx="7" ry="9.5" />
        <ellipse cx="43" cy="12" rx="3.8" ry="8.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function SocialIcon({ type }: { type: SocialType }) {
  const labels: Record<SocialType, string> = {
    linkedin: 'LinkedIn',
    medium: 'Medium',
    mail: 'Email',
  };
  const hrefs: Record<SocialType, string> = {
    linkedin: 'https://www.linkedin.com/in/falopes83/',
    medium: 'https://medium.com/@falopes83',
    mail: '#contato',
  };
  const isExternal = type !== 'mail';

  if (type === 'mail') {
    return (
      <button
        type="button"
        aria-label={labels[type]}
        onClick={openContactForm}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white transition hover:border-teal hover:text-teal"
      >
        <SocialSvg type={type} />
      </button>
    );
  }

  return (
    <a
      href={hrefs[type]}
      aria-label={labels[type]}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white transition hover:border-teal hover:text-teal"
    >
      <SocialSvg type={type} />
    </a>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-deep py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="max-w-md text-3xl font-extrabold leading-tight md:text-4xl">{t.footer.headline}</h2>
          <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-white/66">{t.footer.text}</p>
          <div className="mt-8">
            <Logo light />
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <div className="grid w-full gap-3 sm:w-48">
            <Button type="button" onClick={openContactForm}>
              {t.actions.letsTalk}
            </Button>
            <Button
              href="/assets/CV-2026.pdf"
              variant="outlineSecondary"
              className="border-white/30 text-white hover:bg-white hover:text-ocean"
              download
            >
              {t.actions.downloadCv}
            </Button>
          </div>
          <div className="flex gap-2">
            <SocialIcon type="linkedin" />
            <SocialIcon type="medium" />
            <SocialIcon type="mail" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-5 text-right text-xs font-semibold text-white/45">{t.footer.copyright}</div>
    </footer>
  );
}
