import { Box, ChartLine, Crosshair, Network } from 'lucide-react';
import { useI18n } from '../i18n';

const icons = [Crosshair, Network, Box, ChartLine];

function BenefitIcon({ index }: { index: number }) {
  const Icon = icons[index];

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B9CEE9] text-ocean dark:bg-[var(--fundo)] dark:text-white">
      <Icon size={22} strokeWidth={2.2} />
    </span>
  );
}

export function BenefitStrip() {
  const { t } = useI18n();

  return (
    <section className="relative z-20 border-y border-ocean/10 bg-white py-7 dark:border-white/10 dark:bg-ocean">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.benefits.map((benefit, index) => (
          <article key={benefit.title} className="flex gap-4 rounded-lg p-3">
            <BenefitIcon index={index} />
            <div>
              <h2 className="text-sm font-extrabold text-ocean dark:text-white">{benefit.title}</h2>
              <p className="mt-1 text-xs leading-5 text-ink/60 dark:text-white/60">{benefit.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
