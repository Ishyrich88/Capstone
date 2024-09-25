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
        'primary': '#0ea5e9',    // Primary blue
        'secondary': '#7c3aed',  // Secondary purple
        'neutral': '#64748b',    // Neutral grayish color
        'light': '#f1f5f9',      // Light background color
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],  // Custom sans-serif font (like Inter)
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),      // For better form styling
    require('@tailwindcss/typography'), // For better text formatting
  ],
}


