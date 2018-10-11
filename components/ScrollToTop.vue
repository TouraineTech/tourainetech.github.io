<template>
  <div class="scrolltotop--container" @click="scrollToTop" :class="{'scrolltotop--visible': scrolled}" title="Retourner en haut">
    <img src="@/assets/img/baseline-arrow_upward-24px.svg" alt="scroll to top"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        scrolled: false,
      }
    },
    created() {
      if (process.browser) {
        window.addEventListener('scroll', this.handleScroll)
      }
    },
    destroyed() {
      if (process.browser) {
        window.removeEventListener('scroll', this.handleScroll)
      }
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > (window.innerHeight - 100)
      },
      scrollToTop() {
        if (process.browser) {
          window.scrollTo({
            "behavior": "smooth",
            "top": 0
          })
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  .scrolltotop--container.scrolltotop--visible{
    transform: translateY(0);
    z-index: 100;
  }

  .scrolltotop--container {
    width: 48px;
    height: 48px;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 12px;
    background-color: transparentize($color-primary, 0.5);
    border-radius: 50%;
    transition: 300ms ease-in-out;
    cursor: pointer;

    transform: translateY(100px);

    &:hover {
      background-color: $color-primary;
    }
  }
</style>
