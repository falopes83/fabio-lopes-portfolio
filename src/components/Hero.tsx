import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { openContactForm } from '../utils/contact';
import { Button } from './Button';
import { HeroProjectGallery } from './HeroProjectGallery';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useSectionProgress() {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const updateViewport = () => setIsMobile(mobileQuery.matches);
    updateViewport();
    mobileQuery.addEventListener('change', updateViewport);

    if (!element || prefersReducedMotion) {
      setProgress(1);
      mobileQuery.removeEventListener('change', updateViewport);
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      setProgress(Number(clamp(-rect.top / travel, 0, 1).toFixed(3)));
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      mobileQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  return { ref, progress, isMobile };
}

export function Hero() {
  const { t } = useI18n();
  const { ref, progress, isMobile } = useSectionProgress();
  const textProgress = clamp(progress / (isMobile ? 0.42 : 0.36), 0, 1);

  return (
    <section ref={ref} id="home" className="relative z-0 min-h-[148vh] overflow-visible md:min-h-[310vh]">
      <div className="sticky top-0 min-h-[calc(100svh-4rem)] overflow-hidden md:min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mist via-white to-white dark:from-ocean dark:via-deep dark:to-deep" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-36 bg-gradient-to-b from-mist via-mist/90 to-transparent dark:from-ocean dark:via-ocean/90" />

        <div
          className="relative z-40 mx-auto flex max-w-4xl flex-col items-center px-5 pt-10 text-center md:min-h-[40vh] md:pt-24"
          style={{
            opacity: 1 - textProgress,
            transform: `translate3d(0, ${textProgress * (isMobile ? -46 : -80)}px, 0)`,
          }}
        >
          <small className="font-sans font-semibold text-[var(--blue-padrao)] dark:text-white/70">{t.hero.eyebrow}</small>

          <h1 className="mt-6 font-display text-[1.8rem] font-extrabold leading-[1.08] tracking-[0.02em] text-[var(--blue-padrao)] md:display-l md:mt-[24px] dark:text-white">
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
          </h1>

          <h3 className="mt-4 max-w-[19rem] text-[1rem] font-semibold leading-snug text-[var(--cinza-medio)] md:mt-[18px] md:max-w-xl md:text-2xl dark:text-white/70">{t.hero.text}</h3>

          <div className="mt-6 flex w-full max-w-[13.5rem] flex-col justify-center gap-3 md:mt-[30px] md:w-auto md:max-w-none md:flex-row md:flex-wrap">
            <Button href="#projetos" className="w-full md:w-auto">{t.actions.viewProjects}</Button>
            <Button
              type="button"
              onClick={openContactForm}
              variant="outlineSecondary"
              className="w-full bg-white md:w-auto dark:!bg-[var(--blue-escuro)] dark:hover:!bg-[rgba(103,149,202,0.16)]"
            >
              {t.actions.schedule}
            </Button>
          </div>
        </div>

        <HeroProjectGallery projects={t.projects} imageAlt={t.hero.imageAlt} progress={progress} isMobile={isMobile} />
      </div>
    </section>
  );
}
