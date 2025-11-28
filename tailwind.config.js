/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9BB7D4',
        secondary: '#E4DFD8',
        accent: '#3A4E6B',
      },
    },
  },
  plugins: [],
}