import { useI18n } from '../i18n';
import { openContactForm } from '../utils/contact';
import { Button } from './Button';
import { ScrollReveal } from './ScrollReveal';

function ToolCapsule({ label, icons }: { label: string; icons: string[] }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-[var(--cinza-claro)] bg-white px-3 py-1.5 font-sans text-sm font-bold text-[var(--blue-padrao)] shadow-sm dark:border-[var(--blue-background)] dark:bg-transparent dark:text-white dark:shadow-none">
      {icons.length > 0 ? (
        <span className="flex shrink-0 items-center -space-x-1">
          {icons.map((icon) => (
            <span key={icon} className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-white dark:border-[var(--fundo)]">
              <img src={icon} alt="" className="h-3.5 w-3.5 object-contain" loading="lazy" />
            </span>
          ))}
        </span>
      ) : null}
      {label}
    </span>
  );
}

function Portrait({ alt }: { alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[32px] md:mx-0 md:max-w-none">
      <img src="/assets/fabiolopes.png" alt={alt} className="h-auto w-full dark:hidden" />
      <img src="/assets/fabiolopes-alt.png" alt={alt} className="hidden h-auto w-full dark:block" />
    </div>
  );
}

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="sobre" className="bg-white py-20 text-[var(--blue-escuro)] md:py-24 dark:bg-[var(--fundo)] dark:text-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
          <ScrollReveal>
            <Portrait alt={t.about.portraitAlt} />
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="font-display text-xl font-extrabold tracking-[0.02em] text-[var(--tradewind-padrao)] dark:text-[var(--blue-background)]">
              {t.about.eyebrow}
            </p>
            <h2 className="about-display mt-8 max-w-5xl text-[var(--blue-escuro)] dark:text-white">
              <span className="block xl:whitespace-nowrap">{t.about.titleLine1}</span>
              <span className="block">{t.about.titleLine2}</span>
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={220} className="mt-8 max-w-5xl">
          <div className="flex flex-wrap gap-3 dark:flex">
            <Button type="button" onClick={openContactForm} variant="secondary" className="w-full sm:w-auto">
              {t.actions.letsTalk}
            </Button>
            <Button href="/assets/CV-2026.pdf" variant="outlineSecondary" className="w-full sm:w-auto" download>
              {t.actions.downloadCv}
            </Button>
          </div>
          <p className="mt-8 font-sans text-base font-medium leading-7 tracking-[0.02em] text-[var(--cinza-escuro)] dark:text-white">
            {t.about.textStart}
            <strong className="font-extrabold text-[var(--blue-escuro)] dark:text-white">{t.about.textStrong}</strong>
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal delay={80} className="rounded-lg border border-[var(--cinza-claro)] bg-white p-6 shadow-sm md:p-7 dark:border-white/70 dark:bg-transparent">
            <h3 className="font-display text-3xl font-extrabold tracking-[0.02em] text-[var(--blue-escuro)] dark:text-white">
              {t.about.timelineTitle}
            </h3>
            <div className="mt-8 grid">
              {t.timeline.map(([year, title, text], index) => (
                <div
                  key={year}
                  className={`grid grid-cols-[88px_1fr] gap-5 py-5 ${index > 0 ? 'border-t border-[var(--cinza-claro)] dark:border-white/70' : ''}`}
                >
                  <p className="font-display text-xl font-extrabold text-[var(--tradewind-padrao)] dark:text-[var(--blue-background)]">
                    {year}
                  </p>
                  <div>
                    <h4 className="font-display text-2xl font-extrabold tracking-[0.02em] text-[var(--blue-escuro)] dark:text-white">
                      {title}
                    </h4>
                    <p className="mt-4 font-sans text-base leading-6 tracking-[0.02em] text-[var(--cinza-escuro)] dark:text-white">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal delay={160}>
              <h3 className="font-display text-3xl font-extrabold tracking-[0.02em] text-[var(--blue-escuro)] dark:text-white">
                {t.about.lessonsTitle}
              </h3>
            </ScrollReveal>
            <div className="mt-5 grid gap-4">
              {t.lessons.map((lesson, index) => (
                <ScrollReveal key={lesson.number} delay={220 + index * 90}>
                  <article className="rounded-lg border border-[var(--cinza-claro)] bg-white p-5 shadow-sm dark:border-white/70 dark:bg-transparent">
                    <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-md bg-[var(--blue-claro)] px-3 font-display text-2xl font-extrabold text-[var(--blue-escuro)] dark:bg-[rgba(20,51,79,0.45)] dark:text-white">
                      {lesson.number}
                    </span>
                    <h4 className="mt-6 font-display text-2xl font-extrabold tracking-[0.02em] text-[var(--blue-escuro)] dark:text-white">
                      {lesson.title}
                    </h4>
                    <p className="mt-4 font-sans text-base leading-6 tracking-[0.02em] text-[var(--cinza-escuro)] dark:text-white">{lesson.text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={480}>
              <h3 className="mt-10 font-display text-3xl font-extrabold tracking-[0.02em] text-[var(--blue-escuro)] dark:text-white">
                {t.about.areasTitle}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.toolCapsules.map((capsule, index) => (
                  <ScrollReveal key={capsule.label} delay={540 + index * 35} className="inline-flex">
                    <ToolCapsule label={capsule.label} icons={capsule.icons} />
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
