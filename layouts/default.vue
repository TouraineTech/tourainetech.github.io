<script setup lang="ts">
const scrollbarIsAlwaysVisible = true
</script>

<template>
  <div>
    <Navbar2022 :always-visible="scrollbarIsAlwaysVisible" />
    <ScrollToTop />
    <slot />
    <Footer />
  </div>
</template>

<style lang="scss">
@import "~/assets/scss/main.scss";
</style>
