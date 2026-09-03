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
          navy: "#00203d",
          navyLight: "#003366",
          blue: "#005596",
        },
      },
    },
  },
  plugins: [],
};

export default config;
