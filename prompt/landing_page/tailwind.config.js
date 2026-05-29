/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6B35',
          dark: '#E85A28',
          light: '#FF8F66',
          50: '#FFF4EF',
          100: '#FFE8DC',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(255, 107, 53, 0.12)',
        card: '0 8px 32px rgba(0, 0, 0, 0.08)',
        phone: '0 32px 64px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  plugins: [],
};
