<script setup lang="ts">
const store = useMainStore()
const configuration = computed(() => store.configuration)
</script>

<template>
  <div>
    <template v-if="configuration.isEditionOpen">
      <Header2022 />
      <About />
      <Sponsors v-if="configuration.displaySponsors" />
      <Register v-if="configuration.isRegisterOpen" />
      <CFP v-if="!configuration.isScheduleOnline" />
      <BeginnerSpeakers v-if="!configuration.isScheduleOnline && configuration.isCfpOpen" />
      <TopSpeakers v-if="configuration.isScheduleOnline" />
      <Schedule v-if="configuration.isScheduleOnline" />
      <Pictures v-if="configuration.isPhotoOnline" />
      <Video v-if="configuration.isVideoOnline" />
      <Team />
      <Map />
    </template>
    <template v-else>
      <RendezVous />
    </template>
  </div>
</template>
