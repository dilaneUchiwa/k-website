import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#0A5FA8",
        navy: "#063D6E",
        sky: "#2E9CDB",
        cta: "#E05A00",
        "cta-dark": "#BF4D00",
        ink: "#1A1A2E",
        muted: "#6B7280",
        line: "#E5E7EB",
        "bg-soft": "#F7F8FA",
        green: "#16A34A",
        amber: "#D97706",
        red: "#DC2626",
        sidebar: "#072A4D",
      },
      fontFamily: {
        head: ["Montserrat", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
