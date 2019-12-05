<template>
  <section id="speakers" class="container--white">
    <div class="container--fix container--center">
      <h2>Nos talentueux speakers</h2>
      <div class="speaker--grid">
        <nuxt-link :to="`/speaker/${speaker.displayName}`" v-for="speaker in speakers" :key="speaker.displayName">
          <SpeakerBloc :speaker="speaker"></SpeakerBloc>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
  import SpeakerBloc from '~/components/SpeakerBloc'

  export default {
    components: {
      SpeakerBloc
    },
    computed: {
      speakers() {
        return this.$store.getters.speakers
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

.speaker--grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-bottom: 2rem;
  align-items: stretch;

  @media screen and (max-width: $mobile-step) {
    grid-template-columns: repeat(1, 1fr);

  }
}
</style>
