import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial CoCreate (extraída do CoCreate.Hub)
        brand: {
          primary: "#1F3B57", // azul corporativo
          "primary-soft": "#2A4A6B",
          "primary-deep": "#15293D",
          accent: "#E26A5E", // coral signature
          "accent-soft": "#F08A80",
          "accent-deep": "#C4544A",
          mint: "#A0E7B2", // verde técnica
          "mint-deep": "#5FB876",
          grafite: "#2E2E2E"
        },
        // Backgrounds dark adaptados (tons azulados, harmonizam com brand-primary)
        bg: {
          base: "#0A1422",
          surface: "#142435",
          elevated: "#1B2E45",
          overlay: "rgba(10, 20, 34, 0.95)"
        },
        border: {
          subtle: "#1F344A",
          strong: "#2D4660"
        },
        text: {
          primary: "#F0F4F8",
          secondary: "#94A6B8",
          muted: "#5F7185"
        },
        // Aliases legacy (ink/accent) apontando para a nova paleta — evita big-bang de refactor
        ink: {
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#B6C5D6",
          300: "#94A6B8",
          400: "#7989A0",
          500: "#5F7185",
          600: "#475A6F",
          700: "#2D4660",
          800: "#1F344A",
          900: "#142435",
          950: "#0A1422"
        },
        accent: {
          DEFAULT: "#E26A5E",
          soft: "#F08A80",
          deep: "#C4544A"
        }
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(226, 106, 94, 0.25)",
        "glow-mint": "0 0 24px rgba(160, 231, 178, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
