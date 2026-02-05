/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7cb342',
        secondary: '#f5f1e8',
        background: '#fdfbf7',
        foreground: '#3d3a35',
      },
    },
  },
  plugins: [],
}