<template>
  <section
    id="team"
    class="container--white"
  >
    <div class="container--fix container--center">
      <h2>L'équipe</h2>
      <ul>
        <li
          v-for="p in team"
          :key="p.name"
        >
          <img
            :src="p.avatar"
            :alt="p.name"
          >
          <div>{{ p.name }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    team() {
      return this.$store.state.team;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  background: linear-gradient(rgba(white, 0.8), rgba(white, 0.8) 90%),
    url(~assets/img/team.jpg) 50% 10%;
  background-size: cover;
  min-height: 400px;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  margin-left: -1rem;
  margin-right: -1rem;
  flex-wrap: wrap;

  li {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    img {
      margin: auto;
      border-radius: 100%;
      width: 100px;
      height: 100px;
    }

    div {
      margin-top: 1rem;
    }
  }
}
</style>
