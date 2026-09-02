import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neo-yellow": "#FFD700",
        "neo-blue": "#4169E1",
        "neo-pink": "#FF69B4",
        "neo-green": "#32CD32",
        "neo-orange": "#FF8C00",
        "neo-purple": "#9370DB",
        "neo-bg": "#FFF8DC",
        "neo-card": "#FFFFFF",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        "neo": "4px 4px 0px 0px #000000",
        "neo-lg": "8px 8px 0px 0px #000000",
        "neo-sm": "2px 2px 0px 0px #000000",
        "neo-hover": "6px 6px 0px 0px #000000",
      },
      borderWidth: {
        "3": "3px",
        "4": "4px",
      },
      borderRadius: {
        "neo": "0.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
