<script setup lang="ts">
const store = useMainStore()
const speakers = computed(() => store.speakers)
</script>

<template>
  <section id="speakers" class="container--white">
    <div class="container--fix container--center">
      <h2>Nos talentueux·euses speakers</h2>
      <div class="speaker--grid">
        <NuxtLink
          v-for="speaker in speakers"
          :key="speaker.uid"
          :to="`/speaker/${speaker.uid}`"
        >
          <SpeakerBloc :speaker="speaker" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

.speaker--grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  margin-bottom: 2rem;
  align-items: stretch;

  @media screen and (max-width: $mobile-step) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
