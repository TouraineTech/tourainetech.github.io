<template>
  <section id="cfp" class="container--white">
    <div class="container--fix container--center">
      <h2>Call for paper</h2>
      <template v-if="configuration.isCfpOpen">
        <p>
          Le
          <a href="https://cfp.touraine.tech" target="_blank">
            CFP est ouvert
          </a>
          pour cette édition,
        </p>
      </template>
      <template v-else>
        Le CFP est clos pour cette édition,
      </template>
      la délibération se fera le
      <span class="label--text label--green">{{ configuration.cfpDeliberationDate }}</span>.
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    configuration() {
      return this.$store.getters.configuration;
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 4rem;
}

.button--link {
  font-size: 24px;
}
</style>
