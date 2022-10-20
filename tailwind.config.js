/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        'avatar': '195 / 223'
      },
    },
  },
  plugins: [],
}
