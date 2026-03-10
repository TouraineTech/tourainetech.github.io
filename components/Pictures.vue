<template>
  <section
    id="pictures"
    class="container--green"
  >
    <div class="container--center">
      <h2>Les photos</h2>
      <p class="pictures__count">{{ store.photos.length }} souvenirs de l'édition 2026</p>
      <PhotoGallery />
    </div>
  </section>
</template>

<script setup lang="ts">
const store = useMainStore()
</script>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.pictures__count {
  color: rgba($color-primary, 0.6);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
</style>
