<template>
  <span class="marquee">
    <img
      v-for="sponsor in sponsors" :key="sponsor.id"
      :src="require(`@/assets/img/sponsors/${sponsor.image}`)"
      width="100%"
      :alt="sponsor.name"
      class="logo"
      :class="`sponsor-${sponsor.type}`"
    />
  </span>
</template>

<script>
export default {
  computed: {
    sponsors() {
      return [...this.$store.state.sponsors].reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.logo {
  max-width: 20vh;
  max-height: 100%;
}

.marquee {
  flex-direction: row;
  justify-content: space-around;
  align-content: end;
  align-items: center;
  gap: 48px;
  position: relative;
  animation-name: marquee_animation;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes marquee_animation {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

</style>
