<template>
  <div class="container--white">
    Bienvenue sur la régie TNT
    <section id="regie" class="container--grid">
      <RegieRoom />
      <RegieRoom />
      <RegieRoom />
      <RegieRoom />
    </section>
  </div>
</template>

<script>

import RegieRoom from "@/components/RegieRoom.vue";

export default {
  components: {
    RegieRoom
  },
  mounted() {
    setTimeout(() => {
      window.scroll({top: document.getElementById("regie").offsetTop});
    }, 2000);
  }
}
</script>

<style>
.container--grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.1vw;
  grid-auto-rows: 50vh;
  width: 100%;
  height: 100vh;
}
.regie--room{
 width: 50vw;
 height: 50vh;
}
</style>
