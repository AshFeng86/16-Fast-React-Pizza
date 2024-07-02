/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // the entire page get changed to Roboto Mono font
      sans: "Roboto Mono, monospace",
    },
    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        // dvh: dynamic viewport height unit
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
