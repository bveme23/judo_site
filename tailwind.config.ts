import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626',
        primaryDark: '#991b1b',
        primarySoft: '#fef2f2',
        accent: '#dc2626',
        bgDark: '#050608',
        bg: '#0F1013',
        bgLight: '#ffffff',
        textMain: '#000000',
        textMuted: '#666666',
        borderSubtle: '#e5e5e5',
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans-jp)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-noto-serif-jp)', 'ui-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-10px)' },
        },
      },
      animation: {
        float: 'float 20s ease-in-out infinite',
        'float-delayed': 'float 25s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

