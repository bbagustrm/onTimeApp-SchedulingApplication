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
        primary: "#825daf",
        primaryVariant: "#3700B3",
        secondary: "#03DAC6",
        background: "#121212",
        surface: "#1F1F1F",
        surface2: "#2E2E2EFF",
        onBackground: "#FFFFFF",
        onSurface: "#B1B1B1FF",
        error: "#CF6679",
        warning: "#CFAF66", 
        success: "#89CF66",
      },
    },
  },
  plugins: [],
}

