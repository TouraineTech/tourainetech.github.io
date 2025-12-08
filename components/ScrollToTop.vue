<script setup lang="ts">
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > (window.innerHeight - 100)
}

const scrollToTop = () => {
  if (import.meta.client) {
    location.hash = 'header'
    const uri = window.location.toString()
    const clean_uri = uri.substring(0, uri.indexOf('#'))
    window.history.replaceState({}, document.title, clean_uri)
    return false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="scrolltotop--container"
    :class="{ 'scrolltotop--visible': scrolled }"
    title="Retourner en haut"
    @click="scrollToTop"
    @touch="scrollToTop"
  >
    <img src="/img/baseline-arrow_upward-24px.svg" alt="scroll to top">
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

.scrolltotop--container.scrolltotop--visible {
  transform: translateY(0);
  z-index: 100;
}

.scrolltotop--container {
  width: 48px;
  height: 48px;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 12px;
  background-color: transparentize($color-primary, 0.5);
  border-radius: 50%;
  transition: 300ms ease-in-out;
  cursor: pointer;

  transform: translateY(100px);

  &:hover {
    background-color: $color-primary;
  }
}
</style>
