<template>
  <div v-if="sponsors.length > 0">
    <h3 class="type--title">
      <span>{{ type }}</span>
    </h3>
    <div class="sponsors--container" :class="`sponsor-${type}`">
      <nuxt-link
        v-for="sponsor in sponsors"
        :key="sponsor.id"
        :to="`/sponsor/${sponsor.id}`"
      >
        <img :src="require(`@/assets/img/sponsors/${sponsor.image}`)" width="100%" :alt="sponsor.name">
      </nuxt-link>
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

  .sponsor-Gold {
    --img-max-width: 300px;
    --img-max-height: 300px;
  }

  .sponsor-Silver {
    --img-max-width: 200px;
    --img-max-height: 200px;
  }

  .sponsor-Bronze {
    --img-max-width: 150px;
    --img-max-height: 150px;
  }

  h3.type--title {
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
    align-items: center;

    & > a {
      margin: 1rem;

      img {
        max-width: var(--img-max-width, 150px);
        max-height: var(--img-max-height, 150px);
      }
    }



  }




</style>
