import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tochigi: {
          yellow: "#fff100",
          yellowHover: "#faea00",
          gold: "#fbbf24",
          navy: "#00203d",
          navyLight: "#003366",
          navyDeep: "#060d1a",
          dark: "#030712",
          blue: "#005596",
        },
      },
      boxShadow: {
        "glow-yellow": "0 0 30px -5px rgba(255, 241, 0, 0.25)",
        "glow-gold": "0 0 30px -5px rgba(251, 191, 36, 0.3)",
        "card-modern": "0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.03)",
        "card-hover": "0 20px 40px -15px rgba(0, 32, 61, 0.12), 0 0 1px 1px rgba(0, 32, 61, 0.06)",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
