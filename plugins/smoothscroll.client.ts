import smoothscroll from 'smoothscroll-polyfill'

export default defineNuxtPlugin(() => {
  smoothscroll.polyfill()
})
