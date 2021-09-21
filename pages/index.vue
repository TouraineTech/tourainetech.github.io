<template>
  <div>
    <Header2022></Header2022>
    <About></About>
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

export default {
  components: {
    Header2022,
    About,
    CFP,
    Map,
    Team,
  },
  mounted() {}
};
</script>

