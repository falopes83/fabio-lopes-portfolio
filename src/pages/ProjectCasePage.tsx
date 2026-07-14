import { ArrowLeft } from 'lucide-react';
import { projectSlugs } from '../data/content';
import { useI18n } from '../i18n';
import { Button } from '../components/Button';

type ProjectCasePageProps = {
  slug: string;
};

export function ProjectCasePage({ slug }: ProjectCasePageProps) {
  const { t } = useI18n();
  const projectIndex = Math.max(projectSlugs.indexOf(slug), 0);
  const project = t.projects[projectIndex];
  const sections = [
    [t.projectPage.overview, t.projectPage.overviewText],
    [t.projectPage.challenge, t.projectPage.challengeText],
    [t.projectPage.role, t.projectPage.roleText],
    [t.projectPage.decisions, t.projectPage.decisionsText],
  ];

  return (
    <main>
      <section className="overflow-hidden bg-gradient-to-b from-[var(--blue-claro)] to-white pt-12 dark:from-[var(--fundo)] dark:to-[#020e1a]">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">
          <a
            href="/#projetos"
            className="inline-flex items-center gap-2 font-display text-sm font-bold text-[var(--tradewind-padrao)] transition hover:text-[var(--tradewind-escuro)] dark:text-[var(--blue-background)] dark:hover:text-[var(--blue-border)]"
          >
            <ArrowLeft size={16} />
            {t.projectPage.back}
          </a>

          <div className="mt-10 grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <small className="font-sans font-semibold text-[var(--blue-padrao)] dark:text-[var(--blue-background)]">
                {t.projectPage.eyebrow}
              </small>
              <h1 className="display-xl mt-6 text-[var(--blue-padrao)] dark:text-white">{project.title}</h1>
              <p className="mt-6 max-w-xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-white/72">
                {project.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-2 font-display text-xs font-bold text-[var(--blue-padrao)] shadow-sm dark:bg-white/10 dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-md shadow-soft">
              <img src={project.image} alt={project.title} className="aspect-[16/9] h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-[#020e1a] md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.65fr_1.35fr]">
          <div>
            <h2 className="display-m text-[var(--blue-padrao)] dark:text-white">{t.projectPage.next}</h2>
            <p className="mt-5 font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-white/70">
              {t.projectPage.nextText}
            </p>
            <Button href="/#projetos" variant="outlineSecondary" className="mt-8">
              {t.projectPage.back}
            </Button>
          </div>

          <div className="grid gap-4">
            {sections.map(([title, text]) => (
              <article
                key={title}
                className="rounded-md border border-[var(--cinza-claro)] bg-white p-6 dark:border-white/24 dark:bg-transparent"
              >
                <h3 className="font-display text-2xl font-extrabold text-[var(--blue-padrao)] dark:text-white">{title}</h3>
                <p className="mt-4 font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
