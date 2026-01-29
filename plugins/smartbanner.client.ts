import SmartBanner from 'smart-app-banner'

export default defineNuxtPlugin(() => {
  new SmartBanner({
    daysHidden: 7,
    daysReminder: 14,
    title: 'Touraine Tech',
    author: 'Code-Troopers',
    button: 'Installer',
    store: {
      ios: "sur l'App Store",
      android: 'sur Google Play',
    },
    price: {
      ios: 'Gratuit',
      android: 'Gratuit',
    },
  })
})
