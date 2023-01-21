<template>
  <section
    id="backtoschool"
    class="container--green"
  >
    <div class="container--fix container--center">
      <h2>#BackToSchool</h2>
      <p class="backtoschool--intro">
        Rendez-vous en <span class="label--text label--white">{{ configuration.eventDate }}</span> à <span class="label--text label--white">Polytech'TOURS</span> pour une conférence à un prix accessible.
      </p>
    </div>
  </section>
</template>
<script>

export default {
  computed: {
    configuration() {
      return this.$store.getters.configuration;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/variables";

p {
  font-size: 24px;
}

ul {
  list-style: none;
  padding: 0;
}

ul.backtoschool--numbers {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  li {
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }
  span {
    font-size: 3rem;
    font-weight: bold;
  }
}

ul.backtoschool--themes {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  li {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    font-size: 18px;
    width: 150px;
  }
  img {
    width: 100px;
    height: 100px;
    margin: auto auto 1rem;
  }
}
</style>
