<template>
  <div class="main container--fix">
    <h1>Nos talentueux speakers</h1>
    <div class="speaker--grid">
      <nuxt-link :to="`/speaker/${speaker.name}`" v-for="speaker in speakers" :key="speaker.name">
        <SpeakerBloc :speaker="speaker"></SpeakerBloc>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import SpeakerBloc from '~/components/SpeakerBloc'

  const showdown = require('showdown')
  const converter = new showdown.Converter()
  export default {
    components: {
      SpeakerBloc
    },
    asyncData({store, params}) {
      return {
        speakers: store.getters.speakers
      }
    },
  }
</script>

<style lang="scss" scoped>
    .main{
        padding-top: 64px;
        h1{
          margin-top: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 300;
          font-size: 36px;
        }
        .speaker--grid{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 1rem;
            margin-bottom: 2rem;
        }
    }
</style>
