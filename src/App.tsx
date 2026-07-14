import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BenefitStrip } from './components/BenefitStrip';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { I18nProvider } from './i18n';
import { ProjectCasePage } from './pages/ProjectCasePage';

function getCurrentPath() {
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

export default function App() {
  const [path, setPath] = useState(getCurrentPath);
  const projectSlug = path.match(/^\/projetos\/([^/]+)\/?$/)?.[1];

  useEffect(() => {
    const handleRouteChange = () => setPath(getCurrentPath());

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <I18nProvider>
      <div className="min-h-screen bg-paper text-ink antialiased dark:bg-deep dark:text-paper">
        <Header />
        {projectSlug ? <ProjectCasePage slug={projectSlug} /> : <HomePage />}
        <Footer />
        <FloatingContact />
      </div>
    </I18nProvider>
  );
}
