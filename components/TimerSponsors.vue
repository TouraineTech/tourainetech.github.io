<template>
  <span class="marquee">
    <img
      v-for="sponsor in sponsors" :key="sponsor.id"
      :src="`/img/sponsors/${sponsor.image}`"
      :alt="sponsor.name"
      class="logo"
      :class="`sponsor-${sponsor.type}`"
    />
    <img
      v-for="sponsor in sponsors" :key="sponsor.id"
      :src="`/img/sponsors/${sponsor.image}`"
      :alt="sponsor.name"
      class="logo"
      :class="`sponsor-${sponsor.type}`"
    />
    <img
      v-for="sponsor in sponsors" :key="sponsor.id"
      :src="`/img/sponsors/${sponsor.image}`"
      :alt="sponsor.name"
      class="logo"
      :class="`sponsor-${sponsor.type}`"
    />
  </span>
</template>

<script setup lang="ts">
const store = useMainStore()
const sponsors = computed(() => [...store.sponsors].reverse())
</script>

<style lang="scss" scoped>
@use "../assets/scss/variables" as *;

.logo {
  height: auto;
  max-width: 22vh;
  max-height: 80%;
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
    transform: translateX(-26%);
  }
  100% {
    transform: translateX(127%);
  }
}

</style>
