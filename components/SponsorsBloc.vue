<template>
  <div v-if="sponsors.length > 0">
    <h3><span>{{ type }}</span></h3>
    <div class="sponsors--container">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.name"
        :href="sponsor.link"
        target="_blank"
      >
        <img :src="require(`@/assets/img/${sponsor.image}`)">
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: ""
      }
    },
    computed: {
      sponsors() {
        return this.$store.state.sponsors.filter(sp => sp.type === this.type.toLowerCase())
      }
    }
  }
</script>

<style lang="scss">
  @import "./../assets/scss/variables";

  h3 {
    font-weight: 300;
    position: relative;
    z-index: 1;

    &:before {
      border-top: 2px solid $color-secondary;
      content:"";
      margin: 0 auto;
      position: absolute;
      top: 50%; left: 0; right: 0; bottom: 0;
      width: 35%;
      min-width: 200px;
      z-index: -1;
    }

    span{
      background-color: white;
      padding: 0 1rem;
    }
  }

  .sponsors--container {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem -1rem;
    justify-content: center;

    & > a{
      margin: 1rem;

      img {
        max-width: 150px;
        max-height: 150px;
      }
    }
  }

</style>
