// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src/',
  ssr: true,
  typescript: {
    shim: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    '@sidebase/nuxt-auth'
  ],
  css: [
    // '~/assets/css/main.css',
    '~/assets/scss/main.scss',
    'awesome-notifications/dist/style.css',
  ],
  formkit: {
    defaultConfig: true,
    configFile: './src/config/formkit.config.js',
    // ^ this is now a full config replacement, not override.
  },
  // vue: {
  //   compilerOptions: {
  //     directiveTransforms: {
  //       motion: () => ({
  //         props: [],
  //         needRuntime: true
  //       })
  //     }
  //   }
  // },
  runtimeConfig: {
    public: {
      siteName: 'Nuxt, Pinia, Laravel Starter',
      apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://127.0.0.1:8000/api/'
    },
    authSecret: '123',
    passport: {
      baseUrl: process.env.PASSPORT_BASE_URL,
      clientId: process.env.PASSPORT_CLIENT_ID,
      clientSecret: process.env.PASSPORT_CLIENT_SECRET,
    }
  }
})
