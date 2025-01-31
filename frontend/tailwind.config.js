/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'netflix-red-hover': '#C11119'
      },
      backgroundImage: {
        'custom-gradient-panel': 'linear-gradient(149deg, rgb(25, 34, 71) 0%, rgb(33, 14, 23) 96.86%)',
        'custom-gradient-image': 'linear-gradient(91deg, rgb(38, 23, 51), rgb(21, 26, 63))'
      },
    },
  },
  plugins: [],
}

