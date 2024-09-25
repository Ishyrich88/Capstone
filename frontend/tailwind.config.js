/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-start': '#1e293b', // Dark start gradient
        'dark-end': '#111827',   // Dark end gradient
        'accent': '#38bdf8',     // Accent color for hover effects
      },
    },
  },
  plugins: [],
}
