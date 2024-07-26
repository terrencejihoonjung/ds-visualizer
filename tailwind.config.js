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
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        lofi: {
          ...require("daisyui/src/theming/themes")["[data-theme=lofi]"],
          "font-family": "Inconsolata, monospace",
        },
      },
    ],
  },
};
