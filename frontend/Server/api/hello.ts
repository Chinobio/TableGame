export default defineEventHandler(() => {
  return {
    message: 'Hello from Nuxt Nitro API!',
    time: new Date().toISOString()
  }
})