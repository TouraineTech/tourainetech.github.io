<template>
  <div class="container--fix">
    <h1>{{ talk.title }}</h1>
    <div class="talk-speakers--grid">
      <nuxt-link
        :to="`/speaker/${speaker.uid}`"
        v-for="speaker in speakers"
        :key="speaker.uid"
      >
        <SpeakerBloc :speaker="speaker"></SpeakerBloc>
      </nuxt-link>
    </div>
    <div class="time--container">
      {{ talk.day }} à {{ talk.times }}, Salle {{ talk.rooms }}
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
            :href="slidesLink.pdf ? `/slides/${slidesLink.pdf}` : slidesLink"
          >Les slides </a>
        </p>
      </span>
      <p v-if="talk.peertubeLink">
        <a
          target="_blank"
          :href="`${talk.peertubeLink}`"
        >La vidéo (peertube) </a>
      </p>
      <p v-if="talk.dailymotionLink">
        <a
          target="_blank"
          :href="`${talk.dailymotionLink}`"
        >La vidéo (dailymotion) </a>
      </p>
      <p v-if="talk.youtubeLink">
        <a
          target="_blank"
          :href="`${talk.youtubeLink}`"
        >La vidéo (youtube) </a>
      </p>
    </div>
  </div>
</template>

<script>
import SpeakerBloc from "../../components/SpeakerBloc";
import CONFIGURATION from '../../assets/configuration'


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
    const times = store.getters.times
    const rooms = store.getters.rooms
    let talk = store.getters.talks.filter(({ id }) => id === params.id)[0]
    talk = {...talk, times: times[talk.times[0]].time.replace(':','h'), day: talk.day === 1 ? 'Jeudi' : 'Vendredi', rooms: rooms[talk.rooms - 1] }
    return {
      talk
    };
  },
  head() {
    const title = `Touraine Tech 20${CONFIGURATION.eventEdition} - ${this.talk.title}`;
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
  },
  computed: {
    abstractHTML() {
      return converter.makeHtml(this.talk.abstract);
    },
    speakers() {
      return this.$store.getters.speakers.filter(({uid}) =>
        this.talk.speakers.includes(uid)
      );
    }
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

div.time--container {
  text-align: center;
  border-radius: 10px;
  background-color: lighten($color-secondary, 20%);
  padding: 1rem;
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
