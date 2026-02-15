/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alexandria: ["Alexandria", "sans-serif"],
        alikeAngular: ['"Alike Angular"', "serif"],
        anton: ["Anton", "sans-serif"],
        chathura: ["Chathura", "sans-serif"],
        jetbrains: ['"JetBrains Mono"', "monospace"],
        lilita: ['"Lilita One"', "cursive"],
        merienda: ["Merienda", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        zendots: ['"Zen Dots"', "cursive"],
        marvel: ["Marvel", "sans-serif"],
      },
    },
  },
  plugins: [],
};
