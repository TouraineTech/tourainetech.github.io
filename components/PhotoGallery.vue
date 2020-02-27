<template>
  <div>
    <client-only>
      <div class="photo--container">
        <div
          v-for="(image, index) in photos"
          :key="index"
          class="photo--cell"
          v-lazy:background-image="image.thumb || image.src"
          @click="openGallery(index)"
        >
        </div>
      </div>

    <v-light-box :media="photos" ref="lightbox"
        :show-caption="false"
        :show-light-box="false"></v-light-box>
    </client-only>
  </div>
</template>

<script>
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
  computed: {
      photos() {
          return this.$store.getters.photos.map(
            photo => ({thumb: photo.small, src: photo.original})
          )
      }
  },
  methods: {
    openGallery(index) {
      this.$refs.lightbox.showImage(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.photo {
  &--container {
    justify-content: center;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 500px;
    overflow-x: auto;
    margin: 1rem;
  }

  &--cell {
    min-height: 100px;
    min-width: 150px;
    background-size: cover;
    cursor: pointer;
    background-position: 50% 50%;

    &[lazy=loading] {
      background-color: lightgray;
    }
  }
}
</style>
