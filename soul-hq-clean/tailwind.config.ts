import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        soul: {
          black: "#050506",
          panel: "#111116",
          red: "#ff173d",
          deep: "#23060c",
          gold: "#f6c76b",
          smoke: "#a1a1aa"
        }
      },
      boxShadow: {
        neon: "0 0 40px rgba(255,23,61,.22)",
        gold: "0 0 24px rgba(246,199,107,.15)"
      },
      backgroundImage: {
        "soul-radial": "radial-gradient(circle at 20% 10%, rgba(255,23,61,.28), transparent 32%), radial-gradient(circle at 80% 0%, rgba(246,199,107,.12), transparent 25%), linear-gradient(135deg, #050506 0%, #120408 48%, #050506 100%)"
      }
    }
  },
  plugins: []
};

export default config;
