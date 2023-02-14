// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: './src/',
    ssr: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@formkit/nuxt',
        '@pinia/nuxt',
        'nuxt-icon'
    ],
    css: [
        // '~/assets/css/main.css',
        '~/assets/scss/main.scss',
    ],
    formkit: {
        defaultConfig: true,
        configFile: './src/config/formkit.config.js',
        // ^ this is now a full config replacement, not override.
    },
    vue: {
        compilerOptions: {
            directiveTransforms: {
                motion: () => ({
                    props: [],
                    needRuntime: true
                })
            }
        }
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: "http://127.0.0.1:8000/api/" // process.env.API_BASE_URL,
        }
    }
})
