<script setup lang="ts">
definePageMeta({
  layout: 'naked',
})
</script>

<template>
  <div class="page--schedule">
    <Schedule :for-app="true" />
  </div>
</template>

<style lang="scss" scoped>
.page--schedule {
  margin-top: -2rem;
}
</style>
