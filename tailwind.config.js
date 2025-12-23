/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0f172a", // Dark Slate (Backgrounds)
          800: "#1e293b", // Lighter Dark
          accent: "#2563eb", // Tech Blue
          danger: "#dc2626", // Alert Red
          success: "#16a34a", // Good Green
          warning: "#ca8a04", // Warning Yellow
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}