<template>
  <div>
    <ScrollToTop/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<style lang="scss">
  @import "./../assets/scss/main.scss";
</style>

<script>
  import Footer from '~/components/Footer.vue'
  import Socials from '~/components/Socials.vue'
  import ScrollToTop from '~/components/ScrollToTop.vue'

  export default {
    components: {
      Footer,
      Socials,
      ScrollToTop
    },
    mounted(){
      this.$smoothScroll.polyfill()
    }
  }
</script>
