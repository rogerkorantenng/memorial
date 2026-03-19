import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#0a0806",
        "bg-primary": "#110e0b",
        "bg-card": "#1a1510",
        "bg-elevated": "#231d16",
        "bg-subtle": "#2e2620",
        gold: "#c9a96e",
        "gold-light": "#e2c992",
        burgundy: "#5c2028",
        accent: "#2d8a4e",
        "text-bright": "#f5efe6",
        "text-primary": "#e8dcc8",
        "text-body": "#a89a86",
        "text-muted": "#6b5e50",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
      },
      maxWidth: {
        content: "1100px",
      },
    },
  },
  plugins: [],
};

export default config;
