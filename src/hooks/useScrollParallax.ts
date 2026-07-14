import { useEffect, useState, type RefObject } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function useScrollParallax<T extends HTMLElement>(ref: RefObject<T | null>, speed = 0.08, maxOffset = 48) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!element || prefersReducedMotion) {
      setOffset(0);
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const normalizedProgress = clamp(progress, 0, 1) - 0.5;
      const nextOffset = clamp(normalizedProgress * maxOffset * 2 * speed * 10, -maxOffset, maxOffset);

      setOffset(Number(nextOffset.toFixed(2)));
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
    };
  }, [maxOffset, ref, speed]);

  return offset;
}
