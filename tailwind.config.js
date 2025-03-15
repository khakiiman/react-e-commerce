/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "purpleshade-100": "#374151",
        "purpleshade-300": "#1f2937",
        "purpleshade-400": "#111827",
        "grayshade-50": "#999999",
        "grayshade-100": "#4D4D4D",
        "grayshade-200": "#333333",
        "grayshade-300": "#262626",
        "grayshade-400": "#1A1A1A",
        "grayshade-500": "#141414",
        "lightColor-100": "#FCFCFC",
        "lightColor-200": "#F7F7F7",
        "lightColor-300": "#F3F3F3",
      },
      fontFamily: {
        urbanist: ["urbanist", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme("bgGradientDeg", {}), {
            10: "10deg",
            15: "15deg",
            20: "20deg",
            25: "25deg",
            30: "30deg",
            45: "45deg",
            60: "60deg",
            90: "90deg",
            120: "120deg",
            135: "135deg",
          }),
        }
      );
    }),
  ],
};
