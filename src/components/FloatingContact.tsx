import { ArrowUp, CircleCheck, CircleX, Info, MessageSquare, Send, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { openContactFormEvent } from '../utils/contact';

const whatsappUrl = 'https://wa.me/5511999981734';
const formSubmitEndpoint = 'https://formsubmit.co/ajax/falopes.br@gmail.com';
const minimumSubmitDelayMs = 3500;

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.54 2 2.07 6.45 2.07 11.92c0 1.74.46 3.43 1.33 4.92L2 22l5.29-1.38a10.04 10.04 0 0 0 4.75 1.2h.01c5.5 0 9.97-4.45 9.97-9.92C22.02 6.44 17.54 2 12.04 2Zm0 18.13h-.01a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.14.82.84-3.05-.2-.31a8.17 8.17 0 0 1-1.26-4.34c0-4.53 3.72-8.22 8.3-8.22 2.22 0 4.3.86 5.87 2.41a8.15 8.15 0 0 1 2.43 5.8c0 4.53-3.73 8.22-8.31 8.22Zm4.55-6.16c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.3.37-.45.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.66 4.25 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [formOpenedAt, setFormOpenedAt] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const { t } = useI18n();

  useEffect(() => {
    function handleOpenContactForm() {
      setIsOpen(true);
      setFormOpenedAt(Date.now());
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
      const startedAt = Number(data.get('_form_started_at'));

      data.delete('_form_started_at');

      if (typeof honey === 'string' && honey.trim() !== '') {
        form.reset();
        setStatus('success');
        return;
      }

      if (!Number.isFinite(startedAt) || Date.now() - startedAt < minimumSubmitDelayMs) {
        throw new Error('Form submitted too quickly');
      }

      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (!response.ok) {
        throw new Error('FormSubmit request failed');
      }

      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
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
            <input type="hidden" name="_form_started_at" value={formOpenedAt} />
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
              <Send size={16} />
            </button>
          </form>

          {status === 'success' && <FeedbackCard type="success" title={t.contact.successTitle} text={t.contact.successText} />}
          {status === 'error' && <FeedbackCard type="error" title={t.contact.errorTitle} text={t.contact.errorText} />}
          {status === 'idle' && <FeedbackCard type="info" title={t.contact.infoTitle} text={t.contact.infoText} />}
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          aria-label={t.contact.open}
          onClick={() => {
            setIsOpen((value) => {
              const nextValue = !value;
              if (nextValue) {
                setFormOpenedAt(Date.now());
              }
              return nextValue;
            });
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blue-claro)] text-[var(--blue-padrao)] shadow-soft transition hover:-translate-y-0.5 hover:bg-white dark:bg-[var(--fundo)] dark:text-white"
        >
          <MessageSquare size={20} />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.whatsapp}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--tradewind-padrao)] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[var(--tradewind-escuro)]"
        >
          <WhatsAppIcon />
        </a>

        <a
          href="#home"
          aria-label={t.contact.top}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blue-claro)] text-[var(--blue-padrao)] shadow-soft transition hover:-translate-y-0.5 hover:bg-white dark:bg-[var(--fundo)] dark:text-white"
        >
          <ArrowUp size={22} />
        </a>
      </div>
    </div>
  );
}
