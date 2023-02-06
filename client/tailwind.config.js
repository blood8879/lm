/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
        poppins: ["Poppins", "sans-serif"],
        roman: ["Impact", "Charcoal", "sans-serif"],
        arial: ["Arial", "sans-serif"],
        centuryGothic: ["Century Gothic", "sans-serif"],
      },
      colors: {
        'tr-gray': '#000000bf'
      }
    },
  },
  plugins: [],
}
