/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#f5f5f7",
        card: {
          DEFAULT: "rgba(10, 10, 12, 0.7)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          teal: {
            DEFAULT: "#00d2c4",
            light: "#66e9e1",
            dark: "#008a81",
          },
          gold: {
            DEFAULT: "#d4af37",
            light: "#f3e5ab",
            dark: "#aa7c11",
          },
          dark: {
            100: "#121214",
            200: "#0a0a0c",
            300: "#050505",
          }
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [],
}
