export default defineNuxtConfig({
    ssr: true,
  
    modules: [],
  
    runtimeConfig: {
      public: {
        apiBaseUrl: 'http://localhost:1234',
      },
    },
});