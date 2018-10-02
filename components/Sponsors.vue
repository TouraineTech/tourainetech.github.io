<template>
  <section class="container--white">
    <div class="container--fix container--center">
      <h2>Nos sponsors</h2>
      <p>Vous souhaitez être sponsor, contactez-nous à <a href="mailto:contact@touraine.tech">contact@touraine.tech</a>
      </p>

      <sponsors-bloc type="Platinium"></sponsors-bloc>
      <sponsors-bloc type="Gold"></sponsors-bloc>
      <sponsors-bloc type="Silver"></sponsors-bloc>
      <sponsors-bloc type="Bronze"></sponsors-bloc>
    </div>
  </section>
</template>

<script>
  import SponsorsBloc from './SponsorsBloc.vue'

  export default {
    components: {
      SponsorsBloc
    }
  }
</script>

<style scoped>
  p {
    padding-bottom: 2rem;
  }
</style>
