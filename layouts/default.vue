<template>
  <div>
    <Navbar2022 :always-visible="scrollbarIsAlwaysVisible"></Navbar2022>
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
import Navbar2022 from "~/components/Navbar2022.vue";

export default {
  components: {
    Footer,
    //Socials,
    ScrollToTop,
    Navbar2022
  },
  computed: {
    scrollbarIsAlwaysVisible() {
      //return this.$route.path !== '/'
      return true;
    }
  },
  mounted() {
    this.$smoothScroll.polyfill();
    // new this.SmartBanner({
    //       daysHidden: 15,
    //       daysReminder: 90,
    //       appStoreLanguage: 'fr',
    //       title: 'Touraine Tech',
    //       author: 'Chapito',
    //       button: 'Ouvrir',
    //       store: {
    //           ios: 'Sur l\'App Store',
    //           android: 'Sur Google Play'
    //       },
    //       price: {
    //           ios: 'Gratuit',
    //           android: 'Gratuit'
    //       }
    // });
  }
};
</script>
