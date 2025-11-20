/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#800000",
        "secondary": "#D4AF37",
        "background-light": "#F5F5DC",
        "background-dark": "#2a2a24",
        "text-light": "#3d3d33",
        "text-dark": "#e0e0d4"
      },
      fontFamily: {
        "display": ["Crimson Text", "serif"],
        "body": ["Merriweather", "serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}