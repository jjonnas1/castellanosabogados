/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./new/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
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
        soft: "0 10px 40px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};
