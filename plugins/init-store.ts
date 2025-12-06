export default defineNuxtPlugin(() => {
  const store = useMainStore()
  store.init()
})
