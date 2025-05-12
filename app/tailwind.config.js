/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
        robotoMedium: "RobotoMedium",
        serif: "PTSerif",
      },
      borderWidth: {
        small: "0.5px",
      },
      colors: {
        background: "#18181B",
        black: "#2C2C2C",
        primary: "#6A4CB6",
        base: "#18181b",
      },
    },
  },
  plugins: [],
};
