/* eslint-disable @typescript-eslint/no-var-requires */
const aspectRatio = require('@tailwindcss/aspect-ratio');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', 'sans-serif'],
        nunito: ['var(--font-nunito)', 'var(--font-raleway)', 'sans-serif'],
        gilda: ['var(--font-gilda)', 'serif'],
      },
      maxWidth: {
        '1/2': '50%',
      },
      colors: {
        bluetifulBlue: '#043299',
      },
      spacing: {
        18: '4.5rem',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      scale: {
        200: '2',
      },
      screens: {
        'sm-h': { raw: '(min-height: 640px)' },
        'md-h': { raw: '(min-height: 768px)' },
        'lg-h': { raw: '(min-height: 1024px)' },
        'xl-h': { raw: '(min-height: 1280px)' },
        'mobile-all': {
          raw: '(orientation: portrait) and (min-width: 639px), (orientation: landscape) and (min-height: 640px)',
        },
        'non-touch': { raw: '(hover: hover) and (pointer: fine)' },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [aspectRatio],
};
