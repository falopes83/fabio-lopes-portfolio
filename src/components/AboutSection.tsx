import { useI18n } from '../i18n';
import { openContactForm } from '../utils/contact';
import { Button } from './Button';

function Portrait({ alt }: { alt: string }) {
  return (
    <div className="w-full max-w-[280px] overflow-hidden rounded-[32px] md:max-w-none">
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
          <Portrait alt={t.about.portraitAlt} />

          <div>
            <p className="font-display text-xl font-extrabold tracking-[0.02em] text-[var(--tradewind-padrao)] dark:text-[var(--blue-background)]">
              {t.about.eyebrow}
            </p>
            <h2 className="display-xl mt-8 max-w-5xl text-[var(--blue-escuro)] dark:text-white">
              {t.about.titleLine1}
              <br />
              {t.about.titleLine2}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3 dark:flex">
              <Button type="button" onClick={openContactForm} variant="secondary">
                {t.actions.letsTalk}
              </Button>
              <Button href="/assets/CV-2026.pdf" variant="outlineSecondary" download>
                {t.actions.downloadCv}
              </Button>
            </div>
            <p className="mt-8 max-w-5xl font-sans text-base font-medium leading-7 tracking-[0.02em] text-[var(--cinza-escuro)] dark:text-white/86">
              {t.about.textStart}
              <strong className="font-extrabold text-[var(--blue-escuro)] dark:text-white">{t.about.textStrong}</strong>
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-[var(--cinza-claro)] bg-white p-6 shadow-sm md:p-7 dark:border-white/70 dark:bg-transparent">
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
                    <p className="mt-4 font-sans text-base leading-6 tracking-[0.02em] text-[var(--cinza-escuro)] dark:text-white/78">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-3xl font-extrabold tracking-[0.02em] text-[var(--blue-escuro)] dark:text-white">
              {t.about.lessonsTitle}
            </h3>
            <div className="mt-5 grid gap-4">
              {t.lessons.map((lesson) => (
                <article
                  key={lesson.number}
                  className="rounded-lg border border-[var(--cinza-claro)] bg-white p-5 shadow-sm dark:border-white/70 dark:bg-transparent"
                >
                  <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-md bg-[var(--blue-claro)] px-3 font-display text-2xl font-extrabold text-[var(--blue-escuro)] dark:bg-[rgba(20,51,79,0.45)] dark:text-white">
                    {lesson.number}
                  </span>
                  <h4 className="mt-6 font-display text-2xl font-extrabold tracking-[0.02em] text-[var(--blue-escuro)] dark:text-white">
                    {lesson.title}
                  </h4>
                  <p className="mt-4 font-sans text-base leading-6 tracking-[0.02em] text-[var(--cinza-escuro)] dark:text-white/78">{lesson.text}</p>
                </article>
              ))}
            </div>

            <h3 className="mt-10 font-display text-3xl font-extrabold tracking-[0.02em] text-[var(--blue-escuro)] dark:text-white">
              {t.about.areasTitle}
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {t.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-[var(--blue-claro)] px-4 py-2 font-sans text-sm font-extrabold text-[var(--blue-padrao)] dark:bg-[rgba(20,51,79,0.55)] dark:text-white"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
