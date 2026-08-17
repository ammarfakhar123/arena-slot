/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1B3D',
          dark: '#051024',
          lime: '#76C000',
          limeHover: '#65A300',
          limeLight: '#F3F9E8',
          gray: '#64748B',
          bg: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
