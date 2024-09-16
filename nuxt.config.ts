// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxt/fonts', '@pinia/nuxt', '@pinia/nuxt'],
    css: ['~/assets/css/global.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    fonts: {
        families: [{ name: 'IBM Plex Sans', provider: 'google', weights: [400, 500, 600] }],
    },
})
