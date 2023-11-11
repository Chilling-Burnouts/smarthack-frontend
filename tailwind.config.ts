import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4D5B9E",
        secondary: "#A3B9A5",
        accent: "#F4AC45",
        background: "#ECECEC",
      },
    },
  },
  plugins: [],
};

export default config;
