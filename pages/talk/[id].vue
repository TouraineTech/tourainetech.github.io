<script setup lang="ts">
import Showdown from 'showdown'
import CONFIGURATION from '~/assets/configuration'

const route = useRoute()
const store = useMainStore()
const converter = new Showdown.Converter()

const rawTalk = computed(() =>
  store.talks.find((t) => t.id === route.params.id),
)

if (!rawTalk.value) {
  throw createError({ statusCode: 404, message: 'Talk not found' })
}

const talk = computed(() => {
  const t = rawTalk.value
  if (!t) return null
  const timeData = store.times[t.times?.[0] ?? 0]
  const roomName = store.rooms[(t.rooms?.[0] ?? 1) - 1]
  return {
    ...t,
    times: timeData?.time?.replace(':', 'h') ?? '',
    day: t.day === 1 ? 'Jeudi' : 'Vendredi',
    rooms: roomName,
  }
})

// Use rawTalk.speakers order to preserve speaker ordering
const speakers = computed(() =>
  rawTalk.value?.speakers
    .map((uid) => store.speakers.find((s) => s.uid === uid))
    .filter((s): s is (typeof store.speakers)[number] => s !== undefined) ?? [],
)

const abstractHTML = computed(() => converter.makeHtml(talk.value?.abstract || ''))

const title = computed(
  () => `Touraine Tech 20${CONFIGURATION.eventEdition} - ${talk.value?.title}`,
)
const url = computed(() => `https://touraine.tech/talk/${talk.value?.id}`)

useHead({
  title: title.value,
  meta: [
    { hid: 'description', name: 'description', content: talk.value?.title },
    { hid: 'ogtitle', property: 'og:title', content: title.value },
    { hid: 'ogdescription', property: 'og:description', content: talk.value?.title },
    { hid: 'ogtype', property: 'og:type', content: 'website' },
    { hid: 'ogurl', property: 'og:url', content: url.value },
    { hid: 'oglocale', property: 'og:locale', content: 'fr_FR' },
    { hid: 'twittercard', name: 'twitter:card', content: 'summary' },
    { hid: 'twittertitle', name: 'twitter:title', content: title.value },
    { hid: 'twitterdescription', name: 'twitter:description', content: talk.value?.title },
    { hid: 'twitterimagealt', name: 'twitter:image:alt', content: `Logo ${talk.value?.title}` },
  ],
})
</script>

<template>
  <div v-if="talk" class="container--fix">
    <h1>{{ talk.title }}</h1>
    <div class="talk-speakers--grid">
      <NuxtLink
        v-for="speaker in speakers"
        :key="speaker.uid"
        :to="`/speaker/${speaker.uid}`"
      >
        <SpeakerBloc :speaker="speaker" />
      </NuxtLink>
    </div>
    <div class="time--container">
      {{ talk.day }} à {{ talk.times }}, Salle {{ talk.rooms }}
    </div>
    <div class="description--container">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="abstractHTML" />
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

<style lang="scss" scoped>
@import "~/assets/scss/variables";

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
