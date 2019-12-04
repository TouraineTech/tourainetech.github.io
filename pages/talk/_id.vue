<template>
  <div class="container--fix">
    <h1>{{ talk.title }}</h1>
    <div class="talk-speakers--grid">
      <nuxt-link
        :to="`/speaker/${speaker.displayName}`"
        v-for="speaker in speakers"
        :key="speaker.uid"
      >
        <SpeakerBloc :speaker="speaker"></SpeakerBloc>
      </nuxt-link>
    </div>
    <div class="description--container">
      <p v-html="abstractHTML"></p>
      <span v-if="talk.slidesLinks && talk.slidesLinks.length > 0">
        <p
          v-for="slidesLink of talk.slidesLinks"
          :key="slidesLink"
        >
          <a
            target="_blank"
            :href="`${slidesLink}`"
          >Les slides </a>
        </p>
      </span>
      <p v-if="talk.peertubeLink"><a
          target="_blank"
          :href="`${talk.peertubeLink}`"
        >La vidéo (peertube) </a> </p>
      <p v-if="talk.dailymotionLink"><a
          target="_blank"
          :href="`${talk.dailymotionLink}`"
        >La vidéo (dailymotion) </a> </p>
    </div>
  </div>
</template>

<script>
import SpeakerBloc from "../../components/SpeakerBloc";

const showdown = require("showdown");
const converter = new showdown.Converter();
export default {
  components: {
    SpeakerBloc
  },
  validate({ store, params }) {
    return store.getters.talks.filter(({ id }) => id === params.id).length > 0;
  },
  asyncData({ store, params }) {
    return {
      talk: store.getters.talks.filter(({ id }) => id === params.id)[0]
    };
  },
  computed: {
    abstractHTML() {
      return converter.makeHtml(this.talk.abstract);
    },
    speakers() {
      let speakers = this.$store.getters.speakers.filter(({ uid }) =>
        this.talk.speakers.includes(uid)
      );
      console.log({speakers: this.$store.getters.speakers})
      return speakers;
    }
  },
  head() {
    const title = `Touraine Tech 2020 - ${this.talk.title}`;
    const url = `https://touraine.tech/talk/${this.talk.id}`;
    return {
      titleTemplate: title,
      meta: [
        { hid: "description", name: "description", content: this.talk.title },
        { hid: "ogtitle", property: "og:title", content: title },
        {
          hid: "ogdescription",
          property: "og:description",
          content: this.talk.title
        },
        { hid: "ogtype", property: "og:type", content: "website" },
        { hid: "ogurl", property: "og:url", content: url },
        { hid: "oglocale", property: "og:locale", content: "fr_FR" },
        // Twitter Card
        { hid: "twittercard", name: "twitter:card", content: "summary" },
        { hid: "twittertitle", name: "twitter:title", content: title },
        {
          hid: "twitterdescription",
          name: "twitter:description",
          content: this.talk.title
        },
        {
          hid: "twitterimagealt",
          name: "twitter:image:alt",
          content: `Logo ${this.talk.title}`
        }
      ]
    };
  }
};
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
