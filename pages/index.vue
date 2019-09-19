<template>
  <div>
    <Header2020></Header2020>
    <About></About>
    <Team></Team>
    <Map></Map>
  </div>
</template>

<script>
import Header2020 from "~/components/Header2020.vue";
import About from "~/components/About.vue";
import Map from "~/components/Map.vue";
import Team from "~/components/Team.vue";

export default {
  components: {
    Header2020,
    About,
    Map,
    Team
  },
  mounted() {}
};
</script>

