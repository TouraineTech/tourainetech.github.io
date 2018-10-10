<template>
  <div>
    <Navbar/>
    <Header/>
    <About/>
    <Sponsors/>
    <Register/>
    <!--<LastEdition/>-->
    <Team/>
    <section id="news" class="container--green">
      <div class="container--fix container--center">
        <h2>L'actu</h2>
        <a href="https://twitter.com/intent/tweet?button_hashtag=TNT19&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-lang="fr" data-show-count="false">Tweet #TNT19</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </section>
    <CFP/>
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
  import Socials from '~/components/Socials.vue'
  import About from '~/components/About.vue'
  import CFP from '~/components/CFP.vue'
  import Team from '~/components/Team.vue'
  import Navbar from '~/components/Navbar.vue'

  export default {
    components: {
      Header,
      Register,
      Footer,
      Map,
      Sponsors,
      LastEdition,
      About,
      CFP,
      Team,
      Navbar,
      LastEdition,
      Socials
    }
  }
</script>

