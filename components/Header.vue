<template>
  <section class="container--header">
    <div>
      <img
        src="../assets/img/logo.svg"
        alt="Logo Touraine Tech' 2019">
      <h1 class="title">
        Touraine Tech'
      </h1>
      <h2 class="subtitle">
        Vendredi 01 février 2019
      </h2>
      <p>
        La conférence technique en région centre sur les nouvelles technologies du numérique
      </p>
      <Socials/>
    </div>
    <img
      class="mouse_scroll"
      src="../assets/img/mouse_scroll.svg"
      alt="scroll">
  </section>
</template>

<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  img {
    max-width: 100%;
  }

  .title {
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: $color-primary;
    letter-spacing: 1px;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: $color-primary;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .mouse_scroll {
    width: 32px;
    height: 32px;
    position: absolute;
    bottom: 2rem;
  }

  .container--header {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: url("../assets/img/cover_home.jpg") 50% 50%;
    background-size: cover;
  }

  p {
    font-size: 24px;
    max-width: 600px;
    margin: auto;
    padding: 3rem;
  }

  @media screen and (max-width: $mobile-step) {
    .container--header {
      .title {
        font-size: 36px;
      }
      .subtitle {
        font-size: 24px;
      }
      p {
        font-size: 18px;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  }

</style>


<script>
  import Socials from '~/components/Socials.vue'

  export default {
    components: {
      Socials
    }
  }
</script>

