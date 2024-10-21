/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#979899',
        'navbar-bg': '#121212',
        heading: '#ffffff',
        text: '#bababa',
        'card-bg': '#d1d5db',
        'button-cancel': '#ef4444',
        'button-cancel-text': 'white',
        'button-submit': '#22c55e',
        'button-submit-text': 'black',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
