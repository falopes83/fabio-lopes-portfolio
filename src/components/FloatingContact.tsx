import { ArrowUp, CircleCheck, CircleX, Info, MessageSquare, Send, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { openContactFormEvent } from '../utils/contact';

const whatsappUrl = 'https://wa.me/5511999981734';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'fallback';
type FeedbackType = 'success' | 'error' | 'info';

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
};

const feedbackStyles: Record<FeedbackType, string> = {
  success: 'border-[#8ADBCB] bg-[#D9FFF6] text-[#0F7667]',
  error: 'border-[#F6A0A0] bg-[#FFE8E8] text-[#D92D2D]',
  info: 'border-[#B9CEE9] bg-[#E7F0FB] text-[var(--blue-padrao)]',
};

const feedbackIcons = {
  success: CircleCheck,
  error: CircleX,
  info: Info,
};

function FeedbackCard({ type, title, text }: { type: FeedbackType; title: string; text: string }) {
  const Icon = feedbackIcons[type];

  return (
    <div className={`mt-4 flex gap-3 rounded-lg border px-4 py-3 ${feedbackStyles[type]}`} role="status" aria-live="polite">
      <Icon className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.4} />
      <div>
        <p className="font-display text-sm font-extrabold leading-5 tracking-[0.02em]">{title}</p>
        <p className="mt-1 font-sans text-sm leading-5 tracking-[0.02em]">{text}</p>
      </div>
    </div>
  );
}

function ButtonSpinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
      aria-hidden="true"
    />
  );
}

function FloatingField({ id, label, type = 'text', required = false, autoComplete, maxLength }: FieldProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder=" "
        className="peer h-12 w-full rounded-md border border-[var(--cinza-claro)] bg-white px-3 pt-4 font-sans text-sm text-[var(--blue-escuro)] outline-none transition focus:border-[var(--tradewind-padrao)] dark:border-white/10 dark:bg-[rgba(255,255,255,0.06)] dark:text-white dark:focus:border-[var(--tradewind-border)]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-sans text-sm text-[var(--cinza-medio)] transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--tradewind-escuro)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs dark:peer-focus:text-[var(--tradewind-border)]"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label }: { label: string }) {
  return (
    <div className="relative">
      <textarea
        id="message"
        name="message"
        required
        maxLength={1200}
        placeholder=" "
        rows={5}
        className="peer min-h-32 w-full resize-none rounded-md border border-[var(--cinza-claro)] bg-white px-3 pt-6 font-sans text-sm text-[var(--blue-escuro)] outline-none transition focus:border-[var(--tradewind-padrao)] dark:border-white/10 dark:bg-[rgba(255,255,255,0.06)] dark:text-white dark:focus:border-[var(--tradewind-border)]"
      />
      <label
        htmlFor="message"
        className="pointer-events-none absolute left-3 top-4 font-sans text-sm text-[var(--cinza-medio)] transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--tradewind-escuro)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs dark:peer-focus:text-[var(--tradewind-border)]"
      >
        {label}
      </label>
    </div>
  );
}

function getFormValue(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function buildWhatsAppUrl(data: FormData) {
  const name = getFormValue(data, 'name');
  const email = getFormValue(data, 'email');
  const phone = getFormValue(data, 'phone');
  const message = getFormValue(data, 'message');
  const text = [
    'Olá, Fabio. Vim pelo site e gostaria de conversar.',
    '',
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Telefone: ${phone}`,
    '',
    message,
  ].join('\n');

  return `${whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const { t } = useI18n();

  useEffect(() => {
    function handleOpenContactForm() {
      setIsOpen(true);
      setStatus('idle');
    }

    window.addEventListener(openContactFormEvent, handleOpenContactForm);
    return () => window.removeEventListener(openContactFormEvent, handleOpenContactForm);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    try {
      const form = event.currentTarget;
      const data = new FormData(form);
      const honey = data.get('_honey');

      if (typeof honey === 'string' && honey.trim() !== '') {
        form.reset();
        setStatus('success');
        return;
      }

      window.open(buildWhatsAppUrl(data), '_blank', 'noopener,noreferrer');
      setStatus('fallback');
    } catch (error) {
      console.warn('Could not open WhatsApp contact flow.', error);
      setStatus('idle');
    }
  }

  return (
    <div className="fixed right-5 top-1/2 z-[60] -translate-y-1/2">
      {isOpen && (
        <div className="absolute right-16 top-1/2 w-[min(360px,calc(100vw-6rem))] -translate-y-1/2 rounded-lg bg-white p-6 shadow-[0_24px_70px_rgba(8,31,51,0.25)] dark:bg-[var(--fundo)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            aria-label={t.contact.close}
            onClick={() => {
              setIsOpen(false);
              setStatus('idle');
            }}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md border border-[var(--cinza-claro)] text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] dark:border-white/15 dark:text-white"
          >
            <X size={16} />
          </button>

          <h2 className="font-display text-2xl font-extrabold text-[var(--blue-escuro)] dark:text-white">{t.contact.title}</h2>
          <p className="mt-4 font-sans text-sm leading-6 text-[var(--cinza-escuro)] dark:text-white/70">{t.contact.text}</p>

          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            <input type="hidden" name="_subject" value={t.contact.subject} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_blacklist" value="casino, crypto, forex, investment, loan, seo, viagra, backlink" />
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

            <FloatingField id="name" label={t.contact.name} autoComplete="name" maxLength={120} required />
            <FloatingField id="email" label={t.contact.email} type="email" autoComplete="email" maxLength={160} required />
            <FloatingField id="phone" label={t.contact.phone} type="tel" autoComplete="tel" maxLength={40} required />
            <FloatingTextarea label={t.contact.message} />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--tradewind-padrao)] font-display text-base font-semibold text-white transition hover:bg-[var(--tradewind-escuro)] disabled:cursor-wait disabled:opacity-70 dark:bg-[var(--tradewind-background)] dark:hover:bg-[var(--tradewind-border)]"
            >
              {status === 'sending' ? t.contact.sending : t.contact.submit}
              {status === 'sending' ? <ButtonSpinner /> : <Send size={16} />}
            </button>
          </form>

          {status === 'success' && <FeedbackCard type="success" title={t.contact.successTitle} text={t.contact.successText} />}
          {status === 'fallback' && <FeedbackCard type="info" title={t.contact.fallbackTitle} text={t.contact.fallbackText} />}
          {status === 'idle' && <FeedbackCard type="info" title={t.contact.infoTitle} text={t.contact.infoText} />}
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          aria-label={t.contact.open}
          onClick={() => {
            setIsOpen((value) => !value);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#46b199] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#348f7a] dark:bg-[#6795ca] dark:hover:bg-[#7da9db]"
        >
          <MessageSquare size={20} />
        </button>

        <a
          href="#home"
          aria-label={t.contact.top}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#46b199] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#348f7a] dark:bg-[#6795ca] dark:hover:bg-[#7da9db]"
        >
          <ArrowUp size={22} />
        </a>
      </div>
    </div>
  );
}
