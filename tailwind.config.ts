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
        primary: "#0D3B66", // Deep navy blue
        secondary: "#536271", // Dark grayish-blue
        accent: "#BB4430", // Dark, rich red
        background: "#333F48", // Dark slate gray
      },
    },
  },
  plugins: [],
};

export default config;
