import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'var(--blue-escuro)',
        ocean: 'var(--blue-padrao)',
        deep: 'var(--blue-escuro)',
        mist: 'var(--blue-claro)',
        teal: 'var(--tradewind-padrao)',
        paper: 'var(--off-white)',
        'teal-dark': 'var(--tradewind-escuro)',
        'teal-light': 'var(--tradewind-claro)',
        'blue-light': 'var(--blue-claro)',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(8, 47, 73, 0.11)',
        card: '0 20px 45px rgba(2, 22, 34, 0.22)',
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
