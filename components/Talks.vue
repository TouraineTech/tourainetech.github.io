<script setup lang="ts">
const store = useMainStore()

const talks = computed(() => {
  const confirmedSpeakersId = store.speakers.map(s => s.uid)
  return store.talks
    .filter(({ speakers }) => speakers.every(s => confirmedSpeakersId.indexOf(s) >= 0))
    .filter(({ id }) => id !== 'keynote')
})
</script>

<template>
  <section id="talks" class="container--white">
    <div class="container--fix container--center">
      <h2>Les talks</h2>
      <div class="talk--grid">
        <NuxtLink v-for="talk in talks" :key="talk.id" :to="`/talk/${talk.id}`">
          <TalkBloc :talk="talk" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

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
