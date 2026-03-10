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
          <div class="photo--overlay">
            <svg class="photo--icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M11 8v6M8 11h6" />
            </svg>
          </div>
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

const toLarge = (smallUrl: string) => smallUrl.replace(/_m\.jpg$/, '_b.jpg')

const photos = computed(() =>
  store.photos.map(photo => ({
    thumb: photo.small,
    src: toLarge(photo.small),
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
@use "~/assets/scss/variables" as *;

.photo {
  &--container {
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 500px;
    overflow-x: auto;
    margin: 1rem;
    gap: 3px;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba($color-primary, 0.1);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba($color-primary, 0.3);
      border-radius: 4px;

      &:hover {
        background: rgba($color-primary, 0.5);
      }
    }
  }

  &--cell {
    min-height: 100px;
    min-width: 150px;
    background-size: cover;
    cursor: pointer;
    background-position: 50% 50%;
    position: relative;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.06);
      box-shadow: 0 0 20px rgba($color-secondary, 0.3);
      z-index: 1;
    }

    &:hover .photo--overlay {
      opacity: 1;
    }
  }

  &--overlay {
    position: absolute;
    inset: 0;
    background: rgba($color-primary, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  &--icon {
    width: 28px;
    height: 28px;
    color: white;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
  }
}
</style>
