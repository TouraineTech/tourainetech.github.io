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

.sponsor-gold {
  --img-max-width: 350px;
  --img-max-height: 350px;
}

.sponsor-silver {
  --img-max-width: 300px;
  --img-max-height: 300px;
}

.sponsor-bronze {
  --img-max-width: 200px;
  --img-max-height: 200px;
}

.logo {
  margin: auto 20px;
  max-width: var(--img-max-width);
  max-height: var(--img-max-height);
}

.marquee {
  flex-direction: row;
  justify-content: space-around;
  align-content: end;
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
