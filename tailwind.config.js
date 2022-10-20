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
      boxShadow: {
        'button': '0px 0px 8px 0px rgba(60, 60, 90, 1)'
      }
    },
  },
  mode: 'aot',
  plugins: [],
}
