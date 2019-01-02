<template>
  <div class="container--fix">
    <div class="container--image">
      <img :src="speaker.avatar" :alt="speaker.name">
    </div>
    <h1>{{ speaker.name }}</h1>
    <div class="description--container">
      <p v-html="bioHTML"></p>
    </div>

  </div>
</template>

<script>
  const showdown = require('showdown')
  const converter = new showdown.Converter()
  export default {
    validate({store, params}) {
      return store.getters.speakers.filter(speaker => speaker.name === params.name).length > 0
    },
    asyncData({store, params}) {
      return {
        speaker: store.getters.speakers.filter(speaker => speaker.name === params.name)[0]
      }
    },
    computed: {
      bioHTML() { 
        return converter.makeHtml(this.speaker.bio)
      }
    },
    head() {
      const title = `Touraine Tech 2019 - ${this.speaker.name}`
      const url = `https://touraine.tech/speaker/${this.speaker.name}`
      const image = `${this.speaker.avatar}`
      return {
        titleTemplate: title,
        meta: [
          {hid: 'description', name: 'description', content: this.speaker.bio},
          {hid: 'ogtitle', property: 'og:title', content: title},
          {hid: 'ogdescription', property: 'og:description', content: this.speaker.bio},
          {hid: 'ogtype', property: 'og:type', content: 'website'},
          {hid: 'ogurl', property: 'og:url', content: url},
          {hid: 'ogimage', property: 'og:image', content: image},
          {hid: 'oglocale', property: 'og:locale', content: 'fr_FR'},
          // Twitter Card
          {hid: 'twittercard', name: 'twitter:card', content: 'summary'},
          {hid: 'twittertitle',name: 'twitter:title', content: title},
          {hid: 'twitterdescription',name: 'twitter:description', content: this.speaker.bio},
          {hid: 'twitterimage',name: 'twitter:image', content: image},
          {hid: 'twitterimagealt',name: 'twitter:image:alt', content: `Logo ${this.speaker.name}`},
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
    background-color: lighten($color-secondary, 20%);
    padding: 2rem;
    margin-top: 2rem;

    p {
      line-height: 32px;
    }
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
