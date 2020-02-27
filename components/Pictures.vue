<template>
  <section
    id="pictures"
    class="container--green"
  >
    <div class="container--center">
      <h2>Les photos</h2>
      <PhotoGallery></PhotoGallery>
    </div>
  </section>
</template>

<script>
import PhotoGallery from './PhotoGallery.vue';

export default {
  components: {
    PhotoGallery
  }
  
}
</script>

<style lang="scss" scoped>
#pictures {
  height: 800px;
}
.container--fix {
  height: 100%;
}
</style>
