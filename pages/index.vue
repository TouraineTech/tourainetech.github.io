<template>
  <div>
    <Header/>
    <About/>
    <Sponsors/>
    <Register/>
    <!--<LastEdition/>-->
    <section class="container--white">
      <div class="container--fix container--center">
        <h2>L'équipe</h2>
        <p>Photo d'équipe en fond + nom</p>
      </div>
    </section>
    <section class="container--green">
      <div class="container--fix container--center">
        Fil twitter juste des posts
      </div>
    </section>
    <section class="container--white">
      <div class="container--fix container--center">
        <h2>CFP</h2>
        <p>Proposez c'est cool + lien + date</p>
      </div>
    </section>
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
  import About from '~/components/About.vue'

  export default {
    components: {
      Header,
      Register,
      Footer,
      Map,
      Sponsors,
      LastEdition,
      About
    }
  }
</script>

