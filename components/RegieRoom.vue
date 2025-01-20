<template>
  <div class="regie--room">
    <iframe
      allowfullscreen
      :src="obs"
    ></iframe>
    <iframe
      allowfullscreen
      :src="youtube"
    ></iframe>
  </div>
</template>

<script>

export default {
  props: {
    obs: {
      type: String,
      default() {
        return "";
      }
    },
    youtube: {
      type: String,
      default() {
        return "";
      }
    }
  }
}
</script>

<style>
.regie--room>iframe {
  width: 49%;
  height: 100%;
}
</style>
