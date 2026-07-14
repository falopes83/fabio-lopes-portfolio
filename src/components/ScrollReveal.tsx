import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function ScrollReveal({ children, className = '', delay = 0, once = true }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!element || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
          return;
        }

        if (!once) setIsVisible(false);
      },
      { threshold: 0.12, rootMargin: '0px 0px -18% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const style = {
    transitionDelay: `${delay}ms`,
  } satisfies CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`transition duration-1000 ease-out will-change-transform ${
        isVisible ? 'translate-y-0 scale-100 opacity-100 blur-0' : 'translate-y-14 scale-[0.96] opacity-0 blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  );
}
