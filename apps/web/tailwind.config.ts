import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8f4",
          100: "#deeee3",
          500: "#2f7d4b",
          600: "#25673d",
          700: "#1f5333"
        },
        ink: "#17211a",
        surface: "#f7f8f6",
        accent: "#e8a523"
      },
      boxShadow: {
        soft: "0 12px 32px rgba(23, 33, 26, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config
