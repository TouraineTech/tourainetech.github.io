<template>
  <div>
    <ClientOnly>
      <div ref="scrollContainer" class="gallery-scroll">
        <div class="gallery">
          <div
            v-for="(image, index) in visiblePhotos"
            :key="index"
            class="gallery__item"
            :style="{ animationDelay: `${(index % BATCH_SIZE) * 30}ms` }"
            @click="openGallery(index)"
          >
            <img
              :src="image.thumb"
              :alt="`Photo Touraine Tech ${index + 1}`"
              loading="lazy"
              class="gallery__img"
            />
            <div class="gallery__overlay">
              <svg class="gallery__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
          </div>
        </div>

        <div v-if="hasMore" ref="sentinel" class="gallery-sentinel">
          <div class="gallery-spinner" />
        </div>
      </div>

      <vue-easy-lightbox
        :visible="visible"
        :imgs="allPhotosForLightbox"
        :index="photoIndex"
        @hide="handleHide"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'

const BATCH_SIZE = 48

const store = useMainStore()

const loaded = ref(BATCH_SIZE)
const sentinel = ref<HTMLElement | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

const toLarge = (smallUrl: string) => smallUrl.replace(/_m\.jpg$/, '_b.jpg')

const allPhotosForLightbox = computed(() =>
  store.photos.map(photo => ({
    thumb: photo.small,
    src: toLarge(photo.small),
  }))
)

const visiblePhotos = computed(() =>
  allPhotosForLightbox.value.slice(0, loaded.value)
)

const hasMore = computed(() => loaded.value < store.photos.length)

const loadMore = () => {
  loaded.value = Math.min(loaded.value + BATCH_SIZE, store.photos.length)
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  nextTick(() => {
    if (!scrollContainer.value) return
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore.value) {
          loadMore()
        }
      },
      { root: scrollContainer.value, rootMargin: '200px' }
    )
    if (sentinel.value) observer.observe(sentinel.value)
  })
})

watch(sentinel, (el) => {
  if (el && observer) observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})

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
@use "sass:color";
@use "~/assets/scss/variables" as *;

.gallery-scroll {
  max-height: 80vh;
  overflow-y: auto;
  padding: 0 2rem;

  @media screen and (max-width: $mobile-step) {
    padding: 0 0.5rem;
  }
}

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: $tablet-step) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: $mobile-step) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3px;
  }

  &__item {
    position: relative;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    cursor: pointer;
    border-radius: 3px;
    animation: fadeSlideIn 0.5s ease both;

    &:hover .gallery__img {
      transform: scale(1.06);
    }

    &:hover .gallery__overlay {
      opacity: 1;
    }

    &:hover {
      box-shadow: 0 0 20px rgba($color-secondary, 0.3);
      z-index: 1;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: block;
  }

  &__overlay {
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

  &__icon {
    width: 28px;
    height: 28px;
    color: white;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
  }
}

.gallery-sentinel {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.gallery-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba($color-primary, 0.2);
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
