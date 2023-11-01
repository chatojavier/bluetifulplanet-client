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
      },
    },
  },
  plugins: [],
};
