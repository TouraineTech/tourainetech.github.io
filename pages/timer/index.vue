<script>
export default {
  computed: {
    days() { return this.$store.getters.days;}
  }
}
</script>

<template>
  <div class="container--white">
    Welcome
    <nuxt-link
      v-for="day of days"
      :to="`/timer/days/${day}`"
      :key="day"
    >
      <h4>
        Jour {{ day }}
      </h4>
    </nuxt-link>
  </div>
</template>
