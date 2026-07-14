import { ArrowRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant =
  | 'primary'
  | 'outlinePrimary'
  | 'secondary'
  | 'outlineSecondary'
  | 'link'
  | 'dark'
  | 'ghost';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  showArrow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-transparent bg-[var(--tradewind-padrao)] text-white hover:bg-[var(--tradewind-escuro)] dark:bg-[var(--tradewind-background)] dark:hover:bg-[var(--tradewind-border)]',
  outlinePrimary:
    'border border-[var(--tradewind-padrao)] bg-transparent text-[var(--tradewind-padrao)] hover:border-[var(--tradewind-escuro)] hover:text-[var(--tradewind-escuro)] dark:border-[var(--tradewind-border)] dark:text-[var(--tradewind-border)] dark:hover:bg-[var(--tradewind-hover)]',
  secondary:
    'border border-transparent bg-[var(--blue-padrao)] text-white hover:bg-[var(--blue-escuro)] dark:bg-[var(--blue-background)] dark:hover:bg-[var(--blue-border)]',
  outlineSecondary:
    'border border-[var(--blue-padrao)] bg-transparent text-[var(--blue-padrao)] hover:border-[var(--blue-escuro)] hover:text-[var(--blue-escuro)] dark:border-[var(--blue-border)] dark:text-[var(--blue-border)] dark:hover:bg-[var(--surface-hover)]',
  link:
    'border border-transparent bg-transparent px-0 text-[var(--tradewind-padrao)] hover:text-[var(--tradewind-escuro)] dark:text-[var(--tradewind-border)] dark:hover:text-white',
  dark:
    'border border-transparent bg-[var(--blue-padrao)] text-white hover:bg-[var(--blue-escuro)] dark:bg-[var(--blue-background)] dark:hover:bg-[var(--blue-border)]',
  ghost:
    'border border-transparent bg-transparent text-[var(--blue-padrao)] hover:bg-[var(--surface-hover)] dark:text-white dark:hover:bg-white/10',
};

export function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  showArrow = true,
  ...props
}: ButtonProps) {
  const isLink = variant === 'link';
  const classes = `inline-flex min-h-12 items-center justify-center gap-3 rounded-md px-4 py-3 font-display text-base font-semibold tracking-[0.02em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tradewind-padrao)] ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowRight className={isLink ? 'h-4 w-4' : 'h-4 w-4'} strokeWidth={2.4} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
