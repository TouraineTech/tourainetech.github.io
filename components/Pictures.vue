<template>
  <section id="pictures" class="pictures">
    <div class="pictures__header">
      <h2 class="pictures__title">Les photos</h2>
      <p class="pictures__count">{{ store.photos.length }} souvenirs de l'édition 2026</p>
    </div>
    <PhotoGallery />
  </section>
</template>

<script setup lang="ts">
const store = useMainStore()
</script>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.pictures {
  background-color: $color-secondary;
  padding: 4rem 0;

  &__header {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  &__title {
    color: $color-primary;
    font-weight: 300;
    font-size: 36px;
    padding-bottom: 0.5rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: $color-primary;
      margin: 0.75rem auto 0;
      border-radius: 2px;
    }

    @media screen and (max-width: $mobile-step) {
      font-size: 24px;
    }
  }

  &__count {
    color: rgba($color-primary, 0.6);
    font-size: 0.9rem;
    margin-top: 0.5rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
}
</style>
