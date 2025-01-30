<template>
  <div class="container--white">
    <div id="container--regie">
      <div>
        <h1>Bienvenue sur la régie TNT</h1>
        <p>Passer les paramètres des url youtube comme le lien suivant :</p>
        <p class="scrollable">https://touraine.tech/regie?F21=codeVideoYoutubeSalleF21&F22=codeVideoYoutubeSalleF22&bio=codeVideoYoutubeSalleBio&physique=codeVideoYoutubeSallePhysique</p>
      </div>
      <section id="regie">
        <RegieRoom :title="'F21'" :obs="'https://touraine.tech/obs-web/#wss://starfish-fair-unicorn.ngrok-free.app/'" :youtube="F21" />
        <RegieRoom :title="'F22'" :obs="'https://touraine.tech/obs-web/#wss://labrador-happy-unduly.ngrok-free.app/'" :youtube="F22" />
        <RegieRoom :title="'Bio'" :obs="'https://touraine.tech/obs-web/#wss://innocent-python-premium.ngrok-free.app/'" :youtube="bio" />
        <RegieRoom :title="'Physique'" :obs="'https://touraine.tech/obs-web/#wss://vital-raccoon-preferably.ngrok-free.app/'" :youtube="physique" />
      </section>
    </div>
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
      window.scroll({top: document.getElementById("regie").offsetTop - 24});
    }, 2000);

    this.F21 = `https://www.youtube.com/embed/${this.$route.query.F21}`;
    this.F22 = `https://www.youtube.com/embed/${this.$route.query.F22}`;
    this.bio = `https://www.youtube.com/embed/${this.$route.query.bio}`;
    this.physique = `https://www.youtube.com/embed/${this.$route.query.physique}`;
  }
}
</script>

<style>
#container--regie {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}
p.scrollable {
  overflow-x: scroll;
}
#regie {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.regie--room {
  height: calc((100dvh - 72px) / 2);
  width: calc((100% - 24px) / 2);
}
@media only screen and (max-width: 1600px) {
  .regie--room {
    height: calc(100dvh - 48px);
    width: 100%;
  }
}
</style>
