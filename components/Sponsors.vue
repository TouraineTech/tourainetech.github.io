<template>
  <section class="container--white">
    <div class="container--fix">
      <h2>Nos sponsors</h2>
      <div>Vous voulez être sponsors, contactez-nous</div>
      <!--<div
        v-for="sponsor in sponsors"
        :key="sponsor.id">
        <div>{{ sponsor.name }}</div>
      </div>-->
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      sponsors() {
        return this.$store.state.sponsors
      }
    }
  }
</script>
