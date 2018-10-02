<template>
  <div>
    <Header/>
    <Register/>
    <Sponsors/>
    <LastEdition/>
    <Map/>
    <Footer/>
  </div>
</template>

<script>
  import Footer from '~/components/Footer.vue'
  import Map from '~/components/Map.vue'
  import Header from '~/components/Header.vue'
  import Sponsors from '~/components/Sponsors.vue'
  import Register from '~/components/Register.vue'
  import LastEdition from '~/components/LastEdition.vue'

  export default {
    components: {
      Header,
      Register,
      Footer,
      Map,
      Sponsors,
      LastEdition
    }
  }
</script>

