import { useI18n } from '../i18n';
import { Button } from './Button';
import { ScrollReveal } from './ScrollReveal';

export function ServicesSection() {
  const { t } = useI18n();

  return (
    <section
      id="servicos"
      className="bg-gradient-to-b from-mist to-white py-20 md:py-24 dark:from-[#081F33] dark:to-[#020E1A]"
    >
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-display text-xl font-extrabold italic tracking-[0.02em] text-ocean/70 dark:text-[var(--blue-background)]">
          {t.servicesIntro.eyebrow}
        </p>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="display-l max-w-sm !text-[48px] text-ocean dark:text-white">
            {t.servicesIntro.title}
          </h2>
          <p className="max-w-xl font-sans text-2xl font-medium leading-snug tracking-[0.02em] text-ink/72 dark:text-white">
            {t.servicesIntro.text}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {t.services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 140} className="min-w-0">
              <article className="h-full rounded-lg border border-ocean/10 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/5 dark:bg-[rgba(8,31,51,0.48)]">
                <img
                  src={service.image}
                  alt={service.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="aspect-[5/4] h-auto w-full rounded-md object-contain object-center grayscale dark:invert"
                />
                <h3 className="mt-5 font-display text-[1.4rem] font-extrabold leading-tight tracking-[0.02em] text-ocean dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-6 font-sans text-base leading-6 tracking-[0.02em] text-ink/70 dark:text-white">{service.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 md:mt-[60px] md:flex-row md:items-center md:justify-between">
          <p className="max-w-lg font-sans text-base font-medium leading-6 tracking-[0.02em] text-ink/62 dark:text-white">
            {t.servicesIntro.note}
          </p>
          <Button href="/#projetos" variant="secondary" className="dark:bg-[var(--blue-background)] dark:hover:bg-[var(--blue-border)]">
            {t.actions.viewProjects}
          </Button>
        </div>
      </div>
    </section>
  );
}
