/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        black: "#2C2C2C",
        primary: "#6A4CB6",
        base: "#18181b",
      },
    },
  },
  plugins: [],
};
