<template>
  <div class="container--fix">
    <h1>{{ talk.name }}</h1>
    <div class="talk-speakers--grid">
      <nuxt-link :to="`/speaker/${speaker.name}`" v-for="speaker in speakers" :key="speaker.name">
        <SpeakerBloc :speaker="speaker"></SpeakerBloc>
      </nuxt-link>
    </div>
    <div class="description--container">
      <p v-html="abstractHTML"></p>
      <p v-if="talk.slidesLink"><a target="_blank" :href="`${talk.slidesLink}`" >Les slides </a> </p>
      <p v-if="talk.peertubeLink"><a target="_blank" :href="`${talk.peertubeLink}`" >La vidéo (peertube) </a> </p>
      <p v-if="talk.dailymotionLink"><a target="_blank" :href="`${talk.dailymotionLink}`" >La vidéo (dailymotion) </a> </p>
    </div>
  </div>
</template>

<script>
  import SpeakerBloc from '../../components/SpeakerBloc'

  const showdown = require('showdown')
  const converter = new showdown.Converter()
  export default {
    components: {
      SpeakerBloc
    },
    validate({store, params}) {
      return store.getters.talks.filter(({id}) => id === params.id).length > 0
    },
    asyncData({store, params}) {
      return {
        talk: store.getters.talks.filter(({id}) => id === params.id)[0]
      }
    },
    computed: {
      abstractHTML() {
        return converter.makeHtml(this.talk.abstract)
      },
      speakers() {
        return this.$store.getters.speakers.filter(({id}) => this.talk.speakers.includes(id))
      }
    },
    head() {
      const title = `Touraine Tech 2019 - ${this.talk.name}`
      const url = `https://touraine.tech/talk/${this.talk.name}`
      return {
        titleTemplate: title,
        meta: [
          {hid: 'description', name: 'description', content: this.talk.name},
          {hid: 'ogtitle', property: 'og:title', content: title},
          {hid: 'ogdescription', property: 'og:description', content: this.talk.name},
          {hid: 'ogtype', property: 'og:type', content: 'website'},
          {hid: 'ogurl', property: 'og:url', content: url},
          {hid: 'oglocale', property: 'og:locale', content: 'fr_FR'},
          // Twitter Card
          {hid: 'twittercard', name: 'twitter:card', content: 'summary'},
          {hid: 'twittertitle',name: 'twitter:title', content: title},
          {hid: 'twitterdescription',name: 'twitter:description', content: this.talk.name},
          {hid: 'twitterimagealt',name: 'twitter:image:alt', content: `Logo ${this.talk.name}`},
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/scss/variables";

  .container--fix {
    margin-top: 5rem;
    margin-bottom: 5rem;
    text-align: center;
  }

  h1 {
    color: $color-primary;
    margin-bottom: 1rem;
  }

  h2 {
    color: $color-secondary;
  }

  .container--image {
    margin-top: 2rem;
    margin-bottom: 1rem;
    min-height: 150px;
    display: flex;
    justify-content: center;

    img {
      width: 150px;
      border-radius: 50%;
      align-self: center;
      flex: 0 0 auto;
    }
  }

  div.description--container {
    text-align: left;
    background-color: lighten($color-secondary, 20%);
    padding: 2rem;
    margin-top: 2rem;

    p {
      line-height: 32px;
    }
  }

  .talk-speakers--grid {
    background: $color-primary;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  @media screen and (max-width: $mobile-step) {
    div.description--container {
      margin-left: -2rem;
      margin-right: -2rem;
      .description--link {
        a {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }
    }
  }

</style>
