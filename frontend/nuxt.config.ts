// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'cloudflare_pages',  // 保持這個，讓 API 在 edge 跑
    output: {
      publicDir: 'dist'  // 關鍵！讓 public 產物輸出到 dist 資料夾（非隱藏）
    }
  }
})