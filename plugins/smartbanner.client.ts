import SmartBanner from 'smart-app-banner'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      SmartBanner,
    },
  }
})
