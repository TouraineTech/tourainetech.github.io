<template>
  <div v-if="sponsors.length > 0">
    <h3>{{ type }}</h3>
    <div class="sponsors--container">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.id"
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
