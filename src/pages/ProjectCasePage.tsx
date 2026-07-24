import {
  ArrowLeft,
  BadgeDollarSign,
  CalendarDays,
  FileText,
  GraduationCap,
  Headset,
  Receipt,
  Smartphone,
  UserRoundCog,
  Users,
  WalletCards,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { projectSlugs } from '../data/content';
import { useI18n } from '../i18n';
import { Button } from '../components/Button';

type ProjectCasePageProps = {
  slug: string;
};

const appRemazaSections = [
  {
    id: 'contexto',
    label: 'Contexto',
    title: 'Um aplicativo que concentra a relação entre o consorciado e a Remaza.',
    intro: 'O APP Remaza é a área digital utilizada pelos consorciados para acompanhar suas cotas, realizar pagamentos, consultar assembleias, enviar documentos e acessar informações importantes durante toda a jornada do consórcio.',
    complement:
      'O produto atende diferentes perfis de clientes, desde pessoas adquirindo seu primeiro consórcio até investidores responsáveis por várias cotas. Essa diversidade exige uma experiência clara, acessível e capaz de apresentar informações financeiras sem aumentar a complexidade percebida.',
    visual: 'context',
  },
  {
    id: 'desafio',
    label: 'Desafio',
    title: 'Transformar complexidade em uma jornada mais clara.',
    intro: 'Conteúdo introdutório em desenvolvimento para apresentar o problema central e as principais frentes de investigação.',
    visual: 'stacked',
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    title: 'Da estratégia ao desenho das principais decisões.',
    intro: 'Conteúdo introdutório em desenvolvimento para detalhar responsabilidades, colaboração e entregáveis do projeto.',
    visual: 'split',
  },
  {
    id: 'user-experience',
    label: 'User Experience',
    title: 'Organizar fluxos para reduzir atrito na experiência.',
    intro: 'Conteúdo introdutório em desenvolvimento para narrar jornadas, arquitetura de informação e critérios de usabilidade.',
    visual: 'wide',
  },
  {
    id: 'design-system',
    label: 'Design System',
    title: 'Consistência visual para sustentar evolução.',
    intro: 'Conteúdo introdutório em desenvolvimento para explicar componentes, padrões de interface e alinhamento visual.',
    visual: 'mosaic',
  },
  {
    id: 'mapeando-jornadas',
    label: 'Mapeando jornadas',
    title: 'Enxergar o caminho antes de redesenhar a interface.',
    intro: 'Conteúdo introdutório em desenvolvimento para apresentar mapas, fluxos e pontos de decisão ao longo da jornada.',
    visual: 'stacked',
  },
  {
    id: 'prototipacao',
    label: 'Prototipação',
    title: 'Tornar ideias navegáveis para testar decisões.',
    intro: 'Conteúdo introdutório em desenvolvimento para organizar protótipos, variações de tela e refinamentos de interação.',
    visual: 'split',
  },
  {
    id: 'aprendizados',
    label: 'Aprendizados',
    title: 'O que o processo revelou sobre produto e experiência.',
    intro: 'Conteúdo introdutório em desenvolvimento para registrar aprendizados do projeto sem antecipar resultados definitivos.',
    visual: 'wide',
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    title: 'Uma base mais clara para evoluir a Área do Cliente.',
    intro: 'Conteúdo introdutório em desenvolvimento para fechar a narrativa e indicar próximos desdobramentos do case.',
    visual: 'mosaic',
  },
];

const appRemazaPrimaryAudience = [
  {
    icon: Users,
    text: 'Consorciados',
  },
  {
    icon: BadgeDollarSign,
    text: 'Investidores',
  },
  {
    icon: GraduationCap,
    text: 'Clientes das classes C e D',
  },
  {
    icon: Smartphone,
    text: 'Usuários com diferentes níveis de familiaridade digital',
  },
];

const appRemazaNeeds = [
  {
    icon: WalletCards,
    text: 'Consultar rapidamente informações da cota',
  },
  {
    icon: Receipt,
    text: 'Emitir boletos',
  },
  {
    icon: CalendarDays,
    text: 'Acompanhar assembleias',
  },
  {
    icon: FileText,
    text: 'Acessar documentos',
  },
  {
    icon: UserRoundCog,
    text: 'Atualizar cadastro',
  },
  {
    icon: Headset,
    text: 'Resolver tarefas sem precisar ligar para a central',
  },
];

function ContextList({ title, items }: { title: string; items: typeof appRemazaPrimaryAudience }) {
  return (
    <div>
      <h3 className="font-display text-xl font-extrabold text-[var(--blue-padrao)] dark:text-white">{title}</h3>
      <ul className="mt-6 grid gap-4">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]" strokeWidth={2.2} />
            <span className="font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseContextBlock() {
  return (
    <div className="mt-14 grid gap-10">
      <div className="grid gap-10 border-y border-[var(--cinza-claro)] py-10 dark:border-[var(--blue-padrao)] md:grid-cols-2 md:gap-14 md:py-12">
        <ContextList title="Público principal" items={appRemazaPrimaryAudience} />
        <ContextList title="Necessidades" items={appRemazaNeeds} />
      </div>

      <div className="overflow-hidden rounded-md bg-[#edf4fb] dark:bg-[rgba(20,51,79,0.42)]">
        <img
          src="/assets/projects/app-remaza/01-app.webp"
          alt="Telas do aplicativo APP Remaza"
          className="h-full min-h-[22rem] w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function CaseVisualBlock({ variant }: { variant: string }) {
  if (variant === 'context') {
    return <CaseContextBlock />;
  }

  const baseSurface =
    'rounded-md bg-[linear-gradient(135deg,var(--off-white)_0%,#eef4fb_100%)] dark:bg-[linear-gradient(135deg,rgba(103,149,202,0.12)_0%,rgba(70,177,153,0.08)_100%)]';
  const accentSurface =
    'rounded-md bg-[linear-gradient(135deg,#edf8f5_0%,#f8f9fb_100%)] dark:bg-[linear-gradient(135deg,rgba(70,177,153,0.13)_0%,rgba(103,149,202,0.08)_100%)]';

  if (variant === 'split') {
    return (
      <div className="mt-12 grid gap-5 md:grid-cols-[0.82fr_1.18fr]" aria-hidden="true">
        <div className={`${baseSurface} aspect-[4/5]`} />
        <div className={`${accentSurface} aspect-[4/3] md:mt-16`} />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className="mt-12 grid gap-5" aria-hidden="true">
        <div className={`${baseSurface} aspect-[16/8]`} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className={`${accentSurface} aspect-[4/3]`} />
          <div className={`${baseSurface} aspect-[4/3]`} />
        </div>
      </div>
    );
  }

  if (variant === 'mosaic') {
    return (
      <div className="mt-12 grid gap-5 md:grid-cols-12" aria-hidden="true">
        <div className={`${baseSurface} aspect-[4/3] md:col-span-7`} />
        <div className={`${accentSurface} aspect-[4/5] md:col-span-5 md:mt-10`} />
        <div className={`${accentSurface} aspect-[16/7] md:col-span-12`} />
      </div>
    );
  }

  return <div className={`mt-12 aspect-[16/8] ${baseSurface}`} aria-hidden="true" />;
}

function GenericProjectCasePage({ slug }: ProjectCasePageProps) {
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
            className="inline-flex items-center gap-2 font-display text-sm font-bold text-[var(--tradewind-padrao)] transition hover:text-[var(--tradewind-escuro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:text-[var(--blue-background)] dark:hover:text-[var(--blue-border)] dark:focus-visible:ring-offset-[var(--fundo)]"
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
              <p className="mt-6 max-w-xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-white">
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
            <p className="mt-5 font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-white">
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
                <p className="mt-4 font-sans text-base leading-7 text-[var(--cinza-escuro)] dark:text-white">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function AppRemazaCasePage() {
  const [activeSection, setActiveSection] = useState(appRemazaSections[0].id);

  useEffect(() => {
    const sectionElements = appRemazaSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.08, 0.18, 0.32] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-[var(--blue-padrao)] dark:bg-[var(--fundo)] dark:text-white">
      <section className="app-remaza-hero-scroll relative h-[100svh] w-full overflow-clip bg-[var(--blue-escuro)] text-white md:h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src="/assets/projects/hero-app-remaza.webp"
            alt="Tela do APP Remaza em uso como imagem principal do case"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,51,0.30)_0%,rgba(8,31,51,0.34)_42%,rgba(8,31,51,0.88)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.16] mix-blend-soft-light"
            style={{ backgroundImage: 'url(/assets/projects/noise-effect.avif)', backgroundSize: 'auto' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-[100svh] h-[100svh]">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 pt-10 md:pb-16">
            <a
              href="/#projetos"
              className="absolute left-5 top-6 inline-flex items-center gap-2 rounded-md border border-white/28 bg-black/18 px-4 py-3 font-display text-xs font-bold text-white backdrop-blur-md transition hover:border-white/60 hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--blue-escuro)] md:left-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]"
            >
              <ArrowLeft size={16} />
              Voltar
            </a>

            <div className="max-w-4xl">
              <p className="font-display text-lg font-extrabold tracking-[0.02em] text-white md:text-xl">APP Remaza</p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,6.8vw,4.2rem)] font-extrabold leading-[0.96] tracking-[0.02em] text-white">
                Redesenhando a experiência
                <br className="hidden md:block" />
                da Área do Cliente.
              </h1>
              <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-5">
                <div>
                  <p className="caption font-bold uppercase text-white/56">Atuação</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">UX/UI Design</p>
                  <p className="font-display text-lg font-extrabold text-white">Product Design</p>
                </div>
                <div>
                  <p className="caption font-bold uppercase text-white/56">Ano</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-white">2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--cinza-claro)] bg-white md:hidden dark:border-[var(--blue-padrao)] dark:bg-[var(--fundo)]">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4" aria-label="Navegação do case APP Remaza">
          {appRemazaSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 rounded-md border px-3 py-2 font-display text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                activeSection === section.id
                  ? 'border-[var(--tradewind-padrao)] bg-[var(--tradewind-padrao)] text-[var(--blue-escuro)]'
                  : 'border-[var(--cinza-claro)] text-[var(--blue-padrao)] dark:border-[var(--blue-padrao)] dark:text-[var(--blue-border)]'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="app-remaza-case-content relative z-20 bg-white py-16 dark:bg-[var(--fundo)] md:-mt-[80vh] md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-24 grid gap-8">
              <a
                href="/#projetos"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--blue-padrao)] bg-white px-4 py-3 font-display text-xs font-bold text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] focus-visible:ring-offset-4 dark:border-[var(--blue-border)] dark:bg-transparent dark:text-[var(--blue-border)] dark:focus-visible:ring-offset-[var(--fundo)]"
              >
                <ArrowLeft size={16} />
                Voltar
              </a>

              <nav className="grid gap-1 border-l border-[var(--cinza-claro)] pl-4 dark:border-[var(--blue-padrao)]" aria-label="Navegação do case APP Remaza">
                {appRemazaSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`rounded-sm px-3 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tradewind-padrao)] ${
                      activeSection === section.id
                        ? 'bg-[var(--surface-hover)] text-[var(--tradewind-escuro)] dark:bg-[var(--blue-padrao)] dark:text-gray-100'
                        : 'text-[var(--cinza-escuro)] hover:bg-[var(--surface-hover)] hover:text-[var(--blue-padrao)] dark:text-[var(--blue-border)] dark:hover:text-white'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : undefined}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {appRemazaSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 py-20 first:pt-0 md:py-32"
              >
                <article className="grid gap-10">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3">
                      <span className="caption font-extrabold text-[var(--tradewind-escuro)] dark:text-[var(--blue-border)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-8 bg-[var(--tradewind-padrao)] dark:bg-[var(--blue-border)]" aria-hidden="true" />
                      <p className="caption font-semibold uppercase text-[var(--cinza-escuro)] dark:text-white">
                        {section.label}
                      </p>
                    </div>

                    <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.9rem,4vw,2.2rem)] font-extrabold leading-[1.08] tracking-[0.02em] text-[var(--blue-padrao)] dark:text-white">
                      {section.title}
                    </h2>

                    <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
                      {section.intro}
                    </p>

                    {'complement' in section && section.complement && (
                      <p className="mt-5 max-w-2xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-[var(--cinza-claro)]">
                        {section.complement}
                      </p>
                    )}
                  </div>

                  <CaseVisualBlock variant={section.visual} />
                </article>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProjectCasePage({ slug }: ProjectCasePageProps) {
  if (slug === 'app-remaza') {
    return <AppRemazaCasePage />;
  }

  return <GenericProjectCasePage slug={slug} />;
}
