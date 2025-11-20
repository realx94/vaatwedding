/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4CAF68",
          50: "#F0F9F4",
          100: "#E3F4E7",
          200: "#C8E9CF",
          300: "#A8DDB5",
          400: "#88D19B",
          500: "#6BC584",
          600: "#4CAF68",
          700: "#3C9F58",
          800: "#2E7944",
          900: "#1E4D2B"
        }
      },
      fontFamily: {
        display: ["'Dancing Script'", "'Playfair Display'", "Georgia", "serif"],
        sans: ["'Questrial'", "'Inter'", "system-ui", "sans-serif"],
        heading: ["'Paytone One'", "'Play'", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
}
