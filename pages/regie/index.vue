<template>
  <div class="container--white">
    <h1>Bienvenue sur la régie TNT</h1>
    <p>Passer les paramètres des url youtube comme le lien suivant :</p>
    <p>https://touraine.tech/regie?F21=codeVideoYoutubeSalleF21&F22=codeVideoYoutubeSalleF22&bio=codeVideoYoutubeSalleBio&physique=codeVideoYoutubeSallePhysique</p>
    <section id="regie" class="container--grid">
      <RegieRoom :obs="'https://touraine.tech/obs-web/#wss://starfish-fair-unicorn.ngrok-free.app/'" :youtube="F21" />
      <RegieRoom :obs="'https://touraine.tech/obs-web/#wss://labrador-happy-unduly.ngrok-free.app/'" :youtube="F22" />
      <RegieRoom :obs="'https://touraine.tech/obs-web/#wss://innocent-python-premium.ngrok-free.app/'" :youtube="bio" />
      <RegieRoom :obs="'https://touraine.tech/obs-web/#wss://vital-raccoon-preferably.ngrok-free.app/'" :youtube="physique" />
    </section>
  </div>
</template>

<script>
import RegieRoom from "@/components/RegieRoom.vue";

export default {
  components: {
    RegieRoom
  },
  data: () => ({
    F21:"",
    F22:"",
    bio:"",
    physique:""
  }),
  mounted() {
    setTimeout(() => {
      window.scroll({top: document.getElementById("regie").offsetTop});
    }, 2000);

    this.F21 = `https://www.youtube.com/embed/${this.$route.query.F21}`;
    this.F22 = `https://www.youtube.com/embed/${this.$route.query.F22}`;
    this.bio = `https://www.youtube.com/embed/${this.$route.query.bio}`;
    this.physique = `https://www.youtube.com/embed/${this.$route.query.physique}`;
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
</style>
