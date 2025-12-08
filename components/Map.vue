<template>
  <section class="container--map" id="map">
    <iframe
      width="100%"
      height="400px"
      style="border:0"
      title="Map of the event"
      allowfullscreen
      :src="configuration.addressOSMLink"
    ></iframe>
    <a
      href="https://www.openstreetmap.org/directions?from=&to=47.357268%2C0.702672"
      target="_blank"
      rel="noopener noreferrer"
      class="address-popup"
    >
      {{ configuration.eventAddressName }}
      <br />
      {{ configuration.eventAddressDetail }}
    </a>
  </section>
</template>

<script setup lang="ts">
const store = useMainStore()
const configuration = computed(() => store.configuration)
</script>
<style lang="scss" scoped>
  @use "./../assets/scss/variables" as *;

  .container--map{
    position: relative;
    iframe{
      filter: grayscale(100);
    }
  }

  .address-popup{
    position: absolute;
    //z-index: 100;
    top: 5%;
    left: 5%;
    width: fit-content;
    height: fit-content;
    background-color: $color-secondary;
    color: $color-primary;
  }
</style>
