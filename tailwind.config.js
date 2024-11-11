/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#BB86FC",
        primaryVariant: "#3700B3",
        secondary: "#03DAC6",
        background: "#121212",
        surface: "#1F1F1F",
        onBackground: "#FFFFFF",
        onSurface: "#DDDDDD",
        error: "#CF6679",
        warning: "#CFAF66", 
        green: "#89CF66",
      },
    },
  },
  plugins: [],
}

