<template>
  <section class="container--white">
    <div class="container--fix container--center">
      <h2>Nos sponsors</h2>
      <p><a href="">Vous souhaitez être sponsor</a>, contactez-nous à <a href="mailto:team@touraine.tech">team@touraine.tech</a></p>

      <sponsors-bloc type="Platinium"></sponsors-bloc>
      <sponsors-bloc type="Gold"></sponsors-bloc>
      <sponsors-bloc type="Silver"></sponsors-bloc>
      <sponsors-bloc type="Bronze"></sponsors-bloc>
      <sponsors-bloc type="Partenaires"></sponsors-bloc>


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
