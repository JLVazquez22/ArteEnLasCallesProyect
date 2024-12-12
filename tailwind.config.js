/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        imbue: ['Imbue', 'sans-serif'],
        playwrite: ['Playwrite DK', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
