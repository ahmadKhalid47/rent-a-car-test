import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "480px", // Custom breakpoint for extra small screens
        sm: "640px", // Default Tailwind small breakpoint
        md: "768px", // Default Tailwind medium breakpoint
        lg: "1024px", // Default Tailwind large breakpoint
        xl: "1280px", // Default Tailwind extra large breakpoint
        "2xl": "1536px", // Default Tailwind 2x large breakpoint
        "3xl": "1920px", // Custom breakpoint for 3x large screens
        "1400":"1400px",
        "1200":"1200px",
        "900":"900px"
      },
    },
  },
  plugins: [],
};
export default config;
