/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        imbue: ['"Imbue"', 'serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        ptsans: ['"PT Sans"', 'sans-serif'],
        playwriteDK: ['"Playwrite DK Uloopet Guides"', 'cursive'],
        playwriteUS: ['"Playwrite US Modern Guides"', 'cursive'],
      },
    },
  },
  plugins: [],
}
