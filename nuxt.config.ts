export default defineNuxtConfig({
  css: [`assets/css/main.css`],
  devtools: {enabled: true},
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  head: {
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1',
  },
  googleFonts: {
    families: {
      'Open+Sans': true,
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
    },
  },
});