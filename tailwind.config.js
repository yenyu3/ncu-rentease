/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9BB7D4',
          50: '#F4F7FB',
          100: '#E8EFF6',
          200: '#D1DFED',
          300: '#BACFE4',
          400: '#A3BFDB',
          500: '#9BB7D4',
          600: '#7A9BC7',
          700: '#5A7FB9',
          800: '#4A6B9A',
          900: '#3A567B'
        },
        secondary: '#E4DFD8',
        accent: '#3A4E6B',
      },
    },
  },
  plugins: [],
}