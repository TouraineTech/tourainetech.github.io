<template>
  <a
    href="#register"
    class="HeaderButton"
  >
    <span class="HeaderButton-title RegisterAttendee-title">La billetterie est ouverte</span>
  </a>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use "./../../../assets/scss/variables" as *;
.HeaderButton {
  background-color: $color-secondary;
  color: $color-primary;
  &:focus {
    outline-color: $color-primary;
  }
}
</style>
