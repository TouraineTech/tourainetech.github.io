<template>
  <div>
    <Header2020></Header2020>
    <About></About>
    <Sponsors></Sponsors>
    <Register></Register>
    <TopSpeakers></TopSpeakers>
    <Team></Team>
    <Video></Video>
    <Map></Map>
  </div>
</template>

<script>
import Header2020 from "~/components/Header2020.vue";
import About from "~/components/About.vue";
import Map from "~/components/Map.vue";
import Team from "~/components/Team.vue";
import Register from "~/components/Register.vue";
import Sponsors from "~/components/Sponsors.vue";
import TopSpeakers from "../components/TopSpeakers";
import Video from "~/components/Video.vue";

export default {
  components: {
    Header2020,
    About,
    Map,
    Team,
    Register,
    Sponsors,
    TopSpeakers,
    Video
  },
  mounted() {}
};
</script>

