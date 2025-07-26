module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteBackground: "#e8ecf4",
        iconBackground: "#b8bdf0",
        buttonBackground: "#075eec",

        primary: "#252c4a",
        secondary: "#1e90ff",
        accent: "#3498bd",

        success: "#00c851",
        error: "#ff4444",

        black: "#171717",
        white: "#ffffff",
        background: "#252C4A",
      },
    },
  },
  plugins: []
};
