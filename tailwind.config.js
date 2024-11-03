/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add any custom theme extensions here
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}

