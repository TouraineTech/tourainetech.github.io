<template>
  <div>
    <Header2022></Header2022>
    <About></About>
    <Sponsors></Sponsors>
    <Register></Register>
    <TopSpeakers></TopSpeakers>
    <Schedule></Schedule>
    <Team></Team>
    <Map></Map>
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

export default {
  components: {
    TopSpeakers,
    Register,
    Sponsors,
    Schedule,
    Header2022,
    About,
    Map,
    Team,
  },
  mounted() {}
};
</script>

