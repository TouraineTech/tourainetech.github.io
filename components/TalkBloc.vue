<template>
  <div class="talk--bloc">
    <h3>{{ talk.name }}</h3>
    <nuxt-link :to="`/speaker/${speaker.name}`" v-for="speaker in speakers" :key="speaker.name">
      <SpeakerBloc :speaker="speaker"></SpeakerBloc>
    </nuxt-link>
  </div>
</template>

<script>
  import SpeakerBloc from './SpeakerBloc'

export default {
  components: {
    SpeakerBloc
  },
  props: {
    talk: {
      type: Object,
      default () {
        return {
          name: "",
          speakers: []
        }
      }
    }
  },
  computed: {
    speakers() {
      return this.$store.getters.speakers.filter(({id}) => this.talk.speakers.includes(id))
    }
  }
}
</script>


<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  .talk--bloc{
    text-align: center;
    background-color: $color-primary;
    box-shadow: 0 0 5px lightgrey;
    border-radius: 2px;
    padding: 1rem;
    color: white;
    height: 100%;

    h3{
      font-size: 1rem;
    }
  }
</style>
