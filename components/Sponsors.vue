<template>
  <section
    id="sponsors"
    class="container--white"
  >
    <div class="container--fix container--center">
      <h2>Nos sponsors</h2>
      <p>
        Vous souhaitez être sponsor, consultez notre dossier de sponsoring et contactez-nous à <a href="mailto:team@touraine.tech">team@touraine.tech</a>
      </p>
      <p>
        <a
          class="button--link button--green"
          href="/sponsor_2020.pdf"
          target="_blank"
        >Devenez sponsor</a>
      </p>

      <sponsors-bloc type="Platinium"></sponsors-bloc>
      <sponsors-bloc type="Gold"></sponsors-bloc>
      <sponsors-bloc type="Silver"></sponsors-bloc>
      <sponsors-bloc type="Bronze"></sponsors-bloc>
      <sponsors-bloc type="Partenaires"></sponsors-bloc>

    </div>
  </section>
</template>

<script>
import SponsorsBloc from "./SponsorsBloc.vue";

export default {
  components: {
    SponsorsBloc
  }
};
</script>

<style scoped>
p {
  margin-bottom: 4rem;
}

.button--link {
  font-size: 24px;
}
</style>
