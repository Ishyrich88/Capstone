/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-start': '#1e293b',  // Keep original dark start gradient
        'dark-end': '#111827',    // Keep original dark end gradient
        'accent': '#38bdf8',      // Keep original accent color
        'body-bg': '#f5f5f5',     // Background color for the body from reference site
        'primary-text': '#333333',  // Text color for the body to match reference website
      },
    },
  },
  plugins: [],
};


