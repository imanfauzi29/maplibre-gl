// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "maplibre-gl/dist/maplibre-gl.css"],
  runtimeConfig: {
    public: {
      mapTilerApiKey: process.env.MAPTILER_API_KEY,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["nuxt-maplibre"],
});
