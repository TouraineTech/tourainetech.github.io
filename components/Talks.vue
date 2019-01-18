<template>
  <section id="talks" class="container--white">
    <div class="container--fix container--center">
      <h2>Les talks</h2>
      <div class="talk--grid">
        <nuxt-link :to="`/talk/${talk.id}`" v-for="talk in talks" :key="talk.id">
          <TalkBloc :talk="talk"/>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
  import TalkBloc from '~/components/TalkBloc'

  export default {
    components: {
      TalkBloc
    },
    computed: {
      talks() {
        let confirmedSpeakersId = this.$store.getters.speakers.map(s => s.id)
        return this.$store.getters.talks
        .filter(({speakers}) => speakers.every(s => confirmedSpeakersId.indexOf(s) >= 0))
        .filter(({id}) => id !== "keynote")
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  .talk--grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-bottom: 2rem;

    a {
      text-decoration: none !important;
    }

    @media screen and (max-width: $mobile-step) {
      grid-template-columns: repeat(1, 1fr);

    }
  }
</style>
