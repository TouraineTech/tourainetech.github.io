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

// OpenFeedback URL builder
const OPENFEEDBACK_EVENT_ID = 'nIlFquxGUZ1IJ1cDkc1z'
const DATE_BY_DAY: Record<number, string> = {
  1: '2026-02-12', // Jeudi
  2: '2026-02-13'  // Vendredi
}

const feedbackUrl = computed(() => {
  if (!rawTalk.value?.day) return null
  const date = DATE_BY_DAY[rawTalk.value.day] || DATE_BY_DAY[1]
  return `https://openfeedback.io/${OPENFEEDBACK_EVENT_ID}/${date}/${rawTalk.value.id}`
})

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
    <a
      v-if="feedbackUrl"
      class="feedback-cta"
      target="_blank"
      :href="feedbackUrl"
    >
      <span class="feedback-cta__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </span>
      <span class="feedback-cta__text">Donner votre avis</span>
      <span class="feedback-cta__arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "~/assets/scss/variables" as *;

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
  background-color: color.adjust($color-secondary, $lightness: 20%);
  padding: 2rem;
  margin-top: 2rem;

  p {
    line-height: 32px;
  }
}

div.time--container {
  text-align: center;
  border-radius: 10px;
  background-color: color.adjust($color-secondary, $lightness: 20%);
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

// Feedback CTA Button
.feedback-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding: 1rem 1.75rem;
  background: linear-gradient(135deg, $color-secondary 0%, color.adjust($color-secondary, $lightness: -8%) 100%);
  color: $color-primary;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  border-radius: 50px;
  box-shadow:
    0 4px 15px rgba($color-secondary, 0.35),
    0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  // Subtle shine effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      0 8px 25px rgba($color-secondary, 0.45),
      0 4px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, color.adjust($color-secondary, $lightness: 5%) 0%, $color-secondary 100%);

    &::before {
      left: 100%;
    }

    .feedback-cta__arrow {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    background: rgba($color-primary, 0.15);
    border-radius: 50%;
    padding: 0.25rem;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    flex: 1;
  }

  &__arrow {
    display: flex;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}

@media screen and (max-width: $mobile-step) {
  .feedback-cta {
    width: calc(100% + 4rem);
    margin-left: -2rem;
    margin-right: -2rem;
    border-radius: 0;
    justify-content: center;
  }
}
</style>
