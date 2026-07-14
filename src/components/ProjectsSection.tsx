import { useI18n } from '../i18n';
import { ProjectCard } from './ProjectCard';
import { ScrollReveal } from './ScrollReveal';

export function ProjectsSection() {
  const { t } = useI18n();

  return (
    <section
      id="projetos"
      className="relative overflow-clip py-20 text-white md:py-24"
      style={{ background: 'var(--linear-darkblue)' }}
    >
      <div className="pointer-events-none sticky top-0 h-screen -mb-[100vh]" aria-hidden="true">
        <img
          src="/assets/bg-project.svg"
          alt=""
          className="absolute inset-x-0 -top-20 h-[calc(100vh+160px)] w-full object-cover opacity-100 dark:opacity-60 dark:grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,51,0)_0%,rgba(8,31,51,0.12)_34%,rgba(8,31,51,0.72)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.34)_42%,rgba(0,0,0,0.86)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-xl font-extrabold tracking-[0.02em] text-white">{t.projectsIntro.eyebrow}</p>
          <h2 className="display-m mt-6 text-[var(--tradewind-claro)]">{t.projectsIntro.title}</h2>
          <p className="mx-auto mt-6 max-w-3xl font-display text-2xl font-bold leading-tight tracking-[0.02em] text-white">
            {t.projectsIntro.line1}
            <br />
            {t.projectsIntro.line2}
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {t.projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 110}>
              <ProjectCard index={index} project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
