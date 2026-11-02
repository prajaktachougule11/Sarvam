/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pune: {
          saffron: '#FF7A00',
          terracotta: '#D9480F',
          gold: '#FAB005',
          royal: '#1E1B4B',
          indigo: '#3730A3',
          emerald: '#059669',
          cream: '#FFFDF9',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif']
      }
    },
  },
  plugins: [],
}
