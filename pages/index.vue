<template>
  <div>
    <Header2022></Header2022>
    <About></About>
    <Sponsors></Sponsors>
    <Register></Register>
    <CFP></CFP>
    <Team></Team>
    <Map></Map>
  </div>
</template>

<script>
import Header2022 from "~/components/Header2022.vue";
import About from "~/components/About.vue";
import CFP from "~/components/CFP.vue";
import Map from "~/components/Map.vue";
import Team from "~/components/Team.vue";
import Sponsors from "../components/Sponsors";
import Register from "../components/Register";

export default {
  components: {
    Register,
    Sponsors,
    Header2022,
    About,
    CFP,
    Map,
    Team,
  },
  mounted() {}
};
</script>

