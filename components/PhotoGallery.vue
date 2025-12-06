<template>
  <div>
    <ClientOnly>
      <div class="photo--container">
        <div
          v-for="(image, index) in photos"
          :key="index"
          class="photo--cell"
          :style="{ backgroundImage: `url(${image.thumb || image.src})` }"
          @click="openGallery(index)"
        >
        </div>
      </div>

      <vue-easy-lightbox
        :visible="visible"
        :imgs="photos"
        :index="photoIndex"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'

const store = useMainStore()

const photos = computed(() =>
  store.photos.map(photo => ({
    thumb: photo.small,
    src: photo.original
  }))
)

const visible = ref(false)
const photoIndex = ref(0)

const openGallery = (index: number) => {
  photoIndex.value = index
  visible.value = true
}

const handleHide = () => {
  visible.value = false
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
  }
}
</style>
