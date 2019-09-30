<template>
  <div>
    <Navbar2020 :always-visible="scrollbarIsAlwaysVisible"></Navbar2020>
    <ScrollToTop></ScrollToTop>
    <nuxt />
    <Footer />
  </div>
</template>

<style lang="scss">
@import "./../assets/scss/main.scss";
</style>

<script>
import Footer from "~/components/Footer.vue";
import Socials from "~/components/Socials.vue";
import ScrollToTop from "~/components/ScrollToTop.vue";
import Navbar from "~/components/Navbar.vue";
import Navbar2020 from "~/components/Navbar2020.vue";

export default {
  components: {
    Footer,
    //Socials,
    ScrollToTop,
    Navbar2020
  },
  computed: {
    scrollbarIsAlwaysVisible() {
      //return this.$route.path !== '/'
      return true;
    }
  },
  mounted() {
    this.$smoothScroll.polyfill();
  }
};
</script>
