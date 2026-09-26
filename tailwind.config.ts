import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#02418E",
          orange: "#EF6018",
          blue: "#0084D1",
          dark: "#0F172A",
          muted: "#64748B",
          surface: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
