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
        primary: "#2892D7",
        secondary: "#84C0EB",
        accent: "#F4AC45",
        background: "#6DAEDB",
      },
    },
  },
  plugins: [],
};

export default config;
