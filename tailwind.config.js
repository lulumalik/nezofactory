/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nezo: {
          lime: '#ccff00',       // Electric neon lime from promotion jersey
          'lime-dark': '#84cc16', // Deep athletic lime
          'lime-light': '#e6ff80',
          volt: '#a3e635',
          black: '#0c0f12',      // Deep pitch jersey black
          surface: '#14181d',    // Dark card background
          border: '#232a32',
          red: '#e11d48',        // Matahari promo badge red
          redhover: '#be123c',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(204, 255, 0, 0.4)',
        'glow-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
