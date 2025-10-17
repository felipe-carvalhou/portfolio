tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        acid: "#22d3ee",
        punch: "#fb7185",
        limez: "#a3e635",
      },
      boxShadow: {
        glow: "0 10px 25px -5px rgba(139,92,246,.6), 0 8px 10px -6px rgba(34,211,238,.5)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Noto Sans",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
};
