/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oxanium: ["Oxanium", "sans-serif"],
      },
      colors: {
        golden: "#cca139",
        main: "#186daa",
        main_dark: "#225d87",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        button: { cursor: "pointer" },
      });
    },
  ],
};
