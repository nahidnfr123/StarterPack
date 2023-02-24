const formKitTailwind = require('@formkit/themes/tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#0072BB',
      }
    },
  },
  plugins: [
    formKitTailwind
  ]
}
