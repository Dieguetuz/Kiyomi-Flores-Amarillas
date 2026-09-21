import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/config/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#FBF8F1',
          DEFAULT: '#F5EFE0',
          dark: '#EBDDC3',
          kraft: '#C8B28E',
          deepKraft: '#9E8560',
          night: '#13110D',
          nightPaper: '#1D1914',
          nightBorder: '#2E2720',
        },
        sunflower: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
          glow: '#FFE26A',
        },
        olive: {
          soft: '#9CA777',
          DEFAULT: '#6B7A52',
          dark: '#455034',
          stem: '#5C6D44',
        },
        charcoal: {
          light: '#544A40',
          DEFAULT: '#363028',
          dark: '#1C1914',
        },
        gold: {
          light: '#F2D388',
          DEFAULT: '#C9A24D',
          dark: '#936E27',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(45, 38, 28, 0.08), 0 2px 6px -1px rgba(45, 38, 28, 0.04)',
        'paper-lg': '0 12px 36px -4px rgba(45, 38, 28, 0.16), 0 4px 12px -2px rgba(45, 38, 28, 0.08)',
        'glow-yellow': '0 0 30px rgba(250, 204, 21, 0.35)',
        'glow-gold': '0 0 40px rgba(242, 211, 136, 0.45)',
      },
      animation: {
        'sway-slow': 'sway 6s ease-in-out infinite',
        'sway-gentle': 'swayGentle 4s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        swayGentle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
