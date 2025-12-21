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
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        panel: "var(--color-panel)",
        card: "var(--color-card)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        subtle: "var(--color-subtle)",
        accent: {
          50: "var(--color-accent-soft)",
          500: "var(--color-accent)",
          700: "var(--color-accent-strong)",
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
