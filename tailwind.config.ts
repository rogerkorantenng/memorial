import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0d0d1a",
        "bg-card": "#1a1a2e",
        "bg-subtle": "#2a2a3e",
        "text-primary": "#e0d5c1",
        "text-body": "#8888aa",
        "text-muted": "#555555",
        accent: "#2d8a4e",
        gold: "#c9a96e",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
