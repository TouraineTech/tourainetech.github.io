<template>
  <div>
    <Navbar :always-visible="scrollbarIsAlwaysVisible"/>
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
  import Navbar from '~/components/Navbar.vue'

  export default {
    components: {
      Footer,
      Socials,
      ScrollToTop,
      Navbar
    },
    computed: {
      scrollbarIsAlwaysVisible() {
        //return this.$route.path !== '/'
        return true
      }
    },
    mounted() {
      this.$smoothScroll.polyfill()
    },
    
  }
</script>
