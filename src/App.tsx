import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BenefitStrip } from './components/BenefitStrip';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { SEO } from './components/SEO';
import { I18nProvider } from './i18n';
import { ProjectCasePage } from './pages/ProjectCasePage';
import { getSeoConfig, isPublicRoute } from './seo';

type AppProps = {
  initialPath?: string;
};

function getCurrentPath(initialPath = '/') {
  if (typeof window === 'undefined') {
    return initialPath;
  }

  return window.location.pathname;
}

function HomePage() {
  return (
    <main>
      <div className="relative bg-gradient-to-b from-mist to-white dark:from-ocean dark:to-deep">
        <Hero />
        <BenefitStrip />
      </div>
      <ProjectsSection />
      <ServicesSection />
      <AboutSection />
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="bg-gradient-to-b from-mist to-white text-[var(--blue-escuro)] dark:from-[var(--fundo)] dark:to-[#020e1a] dark:text-white">
      <section className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-5 py-24">
        <p className="font-display text-xl font-extrabold text-[var(--tradewind-padrao)] dark:text-[var(--blue-background)]">
          Página não encontrada
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-none tracking-[0.02em]">
          Este caminho não existe no portfólio.
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-[var(--cinza-escuro)] dark:text-white/78">
          Volte para a página inicial ou acesse os projetos de UX/Product Design publicados.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--tradewind-padrao)] px-5 py-3 font-display text-base font-semibold text-white transition hover:bg-[var(--tradewind-escuro)]"
          >
            Voltar para a home
          </a>
          <a
            href="/#projetos"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--blue-padrao)] px-5 py-3 font-display text-base font-semibold text-[var(--blue-padrao)] transition hover:border-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] dark:border-[var(--blue-border)] dark:text-[var(--blue-border)]"
          >
            Ver projetos
          </a>
        </div>
      </section>
    </main>
  );
}

export default function App({ initialPath = '/' }: AppProps) {
  const [path, setPath] = useState(() => getCurrentPath(initialPath));
  const projectSlug = path.match(/^\/projetos\/([^/]+)\/?$/)?.[1];
  const seoConfig = getSeoConfig(path);
  const isKnownRoute = isPublicRoute(path);

  useEffect(() => {
    const handleRouteChange = () => setPath(getCurrentPath());

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <I18nProvider>
      <div className="min-h-screen bg-paper text-ink antialiased dark:bg-deep dark:text-paper">
        <SEO config={seoConfig} />
        <Header />
        {isKnownRoute && projectSlug ? <ProjectCasePage slug={projectSlug} /> : null}
        {isKnownRoute && !projectSlug ? <HomePage /> : null}
        {!isKnownRoute ? <NotFoundPage /> : null}
        <Footer />
        <FloatingContact />
      </div>
    </I18nProvider>
  );
}
