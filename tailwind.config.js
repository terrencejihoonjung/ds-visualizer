import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        h1: "2.027rem",
        h2: "1.424rem",
        h3: "1.125rem",
        p: "1rem",
        small: "0.889rem",
      },
      fontFamily: {
        mono: ["Inconsolata", "monospace"],
      },
      colors: {
        "base-200": "#a8a29e",
      },
      height: {
        playground: "24rem",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["lofi"],
  },
};
