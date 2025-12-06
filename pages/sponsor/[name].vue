<script setup lang="ts">
import CONFIGURATION from '~/assets/configuration'

const route = useRoute()
const store = useMainStore()

const sponsor = computed(() =>
  store.sponsors.find((s) => s.id === route.params.name),
)

if (!sponsor.value) {
  throw createError({ statusCode: 404, message: 'Sponsor not found' })
}

const title = computed(
  () => `Touraine Tech 20${CONFIGURATION.eventEdition} - Merci à ${sponsor.value?.name} notre partenaire ${sponsor.value?.type}`,
)
const url = computed(() => `https://touraine.tech/sponsor/${sponsor.value?.id}`)
const imageUrl = computed(() => `/img/sponsors/${sponsor.value?.image}`)

useHead({
  title: title.value,
  meta: [
    { hid: 'description', name: 'description', content: sponsor.value?.desc },
    { hid: 'ogtitle', property: 'og:title', content: title.value },
    { hid: 'ogdescription', property: 'og:description', content: sponsor.value?.desc },
    { hid: 'ogtype', property: 'og:type', content: 'website' },
    { hid: 'ogurl', property: 'og:url', content: url.value },
    { hid: 'ogimage', property: 'og:image', content: `https://touraine.tech${imageUrl.value}` },
    { hid: 'oglocale', property: 'og:locale', content: 'fr_FR' },
    { hid: 'twittercard', name: 'twitter:card', content: 'summary' },
    { hid: 'twittertitle', name: 'twitter:title', content: title.value },
    { hid: 'twitterdescription', name: 'twitter:description', content: sponsor.value?.desc },
    { hid: 'twitterimage', name: 'twitter:image', content: `https://touraine.tech${imageUrl.value}` },
    { hid: 'twitterimagealt', name: 'twitter:image:alt', content: `Logo ${sponsor.value?.name}` },
  ],
})
</script>

<template>
  <div v-if="sponsor" class="container--fix">
    <h1>{{ sponsor.name }}</h1>
    <h2 v-if="sponsor.type !== 'partenaires'">
      Sponsor {{ sponsor.type.toLocaleUpperCase() }}
    </h2>
    <h2 v-else>
      Partenaire
    </h2>
    <div class="container--image">
      <img
        :src="`/img/sponsors/${sponsor.image}`"
        :alt="sponsor.name"
      >
    </div>
    <div class="description--container">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="sponsor.desc" />
      <div class="description--link">
        <a
          :href="sponsor.link"
          target="_blank"
        >Visiter leur site internet</a>
      </div>

      <div style="margin-top: 2rem; display: flex; justify-content: space-evenly; align-items: center">
        <div v-if="sponsor.linkedIn">
          <a :href="sponsor.linkedIn" target="_blank">
            <img src="/img/linkedin-icon.svg" width="50px" alt="linkedIn logo">
          </a>
        </div>
        <div v-if="sponsor.twitter">
          <a :href="sponsor.twitter" target="_blank">
            <img src="/img/x.svg" style="filter: invert(); padding: 4px" width="50px" alt="twitter logo">
          </a>
        </div>
        <div v-if="sponsor.bluesky">
          <a :href="sponsor.bluesky" target="_blank">
            <img src="/img/Bluesky_Logo.svg" style="padding: 4px" width="50px" alt="bluesky logo">
          </a>
        </div>
        <div v-if="sponsor.facebook">
          <a :href="sponsor.facebook" target="_blank">
            <img src="/img/facebook-official.svg" width="50px" alt="Facebook logo">
          </a>
        </div>
        <div v-if="sponsor.instagram">
          <a :href="sponsor.instagram" target="_blank">
            <img src="/img/instagram-icon.svg" width="50px" alt="Instragram logo">
          </a>
        </div>
        <div v-if="sponsor.tiktok">
          <a :href="sponsor.tiktok" target="_blank">
            <img src="/img/tiktok-icon.svg" width="50px" alt="tiktok logo">
          </a>
        </div>
        <div v-if="sponsor.youtube">
          <a :href="sponsor.youtube" target="_blank">
            <img src="/img/youtube.svg" width="50px" alt="Youtube logo">
          </a>
        </div>
        <div v-if="sponsor.twitch">
          <a :href="sponsor.twitch" target="_blank">
            <img src="/img/twitch-icon.svg" width="50px" alt="Twitch logo">
          </a>
        </div>
        <div v-if="sponsor.github">
          <a :href="sponsor.github" target="_blank">
            <img src="/img/github-icon.svg" width="50px" alt="Github logo">
          </a>
        </div>
      </div>
    </div>
    <div v-if="sponsor.jobOffers && sponsor.jobOffers.length !== 0" class="job-offer-bloc description--container">
      <h3>Offres d'emploi</h3>
      <a
        v-for="jobOffer in sponsor.jobOffers"
        :id="jobOffer.id"
        :key="jobOffer.id"
        :href="jobOffer.pdf ? `/sponsors/${sponsor.id}/${jobOffer.pdf}` : `${jobOffer.link}`"
        target="_blank"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h3 v-html="jobOffer.title" />
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.job-offer-bloc article h4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

.container--fix {
  margin-top: 5rem;
  margin-bottom: 5rem;
  text-align: center;
}

h1 {
  color: $color-primary;
}

h2 {
  color: $color-secondary;
}

.container--image {
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 200px;
  display: flex;
  justify-content: center;

  img {
    width: 300px;
    align-self: center;
    flex: 0 0 auto;
  }
}

div.description--container {
  background-color: lighten($color-secondary, 20%);
  padding: 2rem;

  p {
    text-align: justify;
    line-height: 32px;
  }

  .description--link {
    margin-top: 2rem;
    a {
      color: white;
      text-decoration: none;
      background-color: $color-primary;
      padding: 0.5rem 3rem;
      border-radius: 0.5rem;
      width: auto;
    }
  }
}

.job-offer-bloc {
  background-color: lighten($color-secondary, 20%);
  margin-top: 2rem;
  margin-bottom: 2rem;
  h3 {
    margin-bottom: 1rem;
  }
  article {
    text-align: justify;
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
