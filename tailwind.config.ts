import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#080810",
        "bg-primary": "#0c0c18",
        "bg-card": "#12121f",
        "bg-elevated": "#1a1a2e",
        "bg-subtle": "#232340",
        gold: "#c9a96e",
        "gold-light": "#e2c992",
        accent: "#2d8a4e",
        "text-bright": "#f0ece4",
        "text-primary": "#e0d5c1",
        "text-body": "#9a96a8",
        "text-muted": "#5a5670",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
