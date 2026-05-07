/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./new/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-serif)", "'Source Serif 4'", "Georgia", "serif"],
      },
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        subtle: "rgb(var(--color-subtle) / <alpha-value>)",
        accent: {
          50: "rgb(var(--color-accent-soft) / <alpha-value>)",
          500: "rgb(var(--color-accent) / <alpha-value>)",
          700: "rgb(var(--color-accent-strong) / <alpha-value>)",
        },
        // Opcional: mantener paleta "brand" para estilos antiguos (compatibilidad)
        brand: {
          50: "#f3f7fb",
          100: "#e4ecf6",
          200: "#c4d8ee",
          300: "#95bbe2",
          400: "#6498d1",
          500: "#3f75b5",
          600: "#2f5c97",
          700: "#284a7a",
          800: "#243f66",
          900: "#203755",
        },
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        hover: "var(--shadow-hover)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.2)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "26px",
        "3xl": "32px",
      },
      letterSpacing: {
        tightest: "-0.02em",
      },
    },
  },
  plugins: [],
};
