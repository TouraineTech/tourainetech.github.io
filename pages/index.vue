<template>
  <div>
    <template v-if="configuration.isEditionOpen">
      <Header2022></Header2022>
      <About></About>
      <Sponsors v-if="configuration.displaySponsors"></Sponsors>
      <Register v-if="configuration.isRegisterOpen"></Register>
      <CFP v-if="!configuration.isScheduleOnline && configuration.cfpOpen"></CFP>
      <TopSpeakers v-if="configuration.isScheduleOnline"></TopSpeakers>
      <Schedule v-if="configuration.isScheduleOnline"></Schedule>
      <Pictures v-if="configuration.isVideoOnline"></Pictures>
      <Video v-if="configuration.isVideoOnline"></Video>
      <Team></Team>
      <Map></Map>
    </template>
    <template v-else>
      <RendezVous></RendezVous>
    </template>
  </div>
</template>

<script>
import Header2022 from "~/components/Header2022.vue";
import About from "~/components/About.vue";
import Map from "~/components/Map.vue";
import Team from "~/components/Team.vue";
import Sponsors from "../components/Sponsors";
import Register from "../components/Register";
import Schedule from "../components/Schedule";
import TopSpeakers from "../components/TopSpeakers";
import CFP from "../components/CFP";
import RendezVous from "../components/RendezVous";
import Video from "../components/Video";
import Pictures from "../components/Pictures";

export default {
  components: {
    Pictures,
    Video,
    TopSpeakers,
    Register,
    Sponsors,
    Schedule,
    Header2022,
    About,
    Map,
    Team,
    CFP,
    RendezVous
  },
  data() {
    return {


    }
  },
  computed: {
    configuration() {
      return this.$store.getters.configuration;
    },
  },
  mounted() {}
};
</script>

