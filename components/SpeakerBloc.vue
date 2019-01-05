<template>
  <div class="speaker--bloc">
    <div class="container--image">
      <img :src="speaker.avatar" :alt="speaker.name">
    </div>
    <h3>{{ speaker.name }}</h3>
  </div>
</template>

<script>
export default {
    props: {
        speaker: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

  .speaker--bloc{
      text-align: center;
      background-color: $color-primary;
      //box-shadow: 0 0 5px lightgrey;
      border-radius: 2px;
      padding: 1rem;
      color: white;
      height: available;

      img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid white;
      }

      h3{
        font-size: 1rem;
      }
  }
</style>
