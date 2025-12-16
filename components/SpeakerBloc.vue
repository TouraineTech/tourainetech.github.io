<template>
  <div class="speaker--bloc">
    <div class="container--image">
      <img :src="`/img/speakers/${speaker.uid}.png`" :alt="speaker.name">
    </div>
    <h3>{{ speaker.name }}</h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  speaker: {
    uid: string
    name: string
    picture?: boolean
  }
}>()
</script>

<style lang="scss" scoped>
@use "./../assets/scss/variables" as *;

  .speaker--bloc{
      text-align: center;
      background-color: $color-primary;
      border-radius: 2px;
      padding: 1rem;
      color: white;
      height: 100%;

      img{
          width: 75px;
          height: 75px;
          border-radius: 50%;
          border: 3px solid white;
          object-fit: cover;
      }

      h3{
        font-size: 1rem;
      }
  }
</style>
