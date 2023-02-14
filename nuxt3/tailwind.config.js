const formKitTailwind = require('@formkit/themes/tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/components/**/*.{js,vue,ts}",
        "./src/composables/**/*.{js,vue,ts}",
        "./src/layouts/**/*.vue",
        "./src/pages/**/*.vue",
        "./src/plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./src/config/formkit.config.{js,ts}",
        "./src/config/formKitTheme.{js,ts}",
        "./app.vue",
        "./error.vue",
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
