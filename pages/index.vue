<template>
  <div>
    <Header/>
    <About/>
    <Sponsors/>
    <Video/>
    <Pictures/>
    <!--<LastEdition/>-->
    <!--<TopSpeakers/>-->
    <!--<Talks/>-->
    <Schedule/>
    <Team/>
    <section id="news" class="container--green">
      <div class="container--fix container--center">
        <h2>L'actu</h2>
        <a href="https://twitter.com/intent/tweet?button_hashtag=TNT19&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-lang="fr" data-show-count="false">Tweet #TNT19</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </section>
    <!--<CFP/>-->
    <Map/>
  </div>
</template>

<script>
  import Map from '~/components/Map.vue'
  import Header from '~/components/Header.vue'
  import Sponsors from '~/components/Sponsors.vue'
  import Register from '~/components/Register.vue'
  import Pictures from '~/components/Pictures.vue'
  import LastEdition from '~/components/LastEdition.vue'
  import Socials from '~/components/Socials.vue'
  import About from '~/components/About.vue'
  import CFP from '~/components/CFP.vue'
  import Team from '~/components/Team.vue'
  import Navbar from '~/components/Navbar.vue'
  import TopSpeakers from '~/components/TopSpeakers.vue'
  import Talks from '~/components/Talks.vue'
  import Schedule from '~/components/Schedule.vue'
  import Video from '~/components/Video.vue'

  export default {
    components: {
      Header,
      Register,
      Pictures,
      Map,
      Sponsors,
      LastEdition,
      About,
      CFP,
      Team,
      Socials,
      Navbar,
      TopSpeakers,
      Talks,
      Schedule,
      Video
    },
    mounted(){
      this.$smoothScroll.polyfill()
    }
  }
</script>

