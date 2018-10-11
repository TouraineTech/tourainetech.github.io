<template>
  <section class="container--header">
    <div class="logo">
      <img
        src="../assets/img/logo.svg"
        alt="Logo Touraine Tech' 2019">
    </div>
    <h1 class="title">
      Touraine Tech'
    </h1>
    <h2 class="subtitle">
      Vendredi 01 février 2019
    </h2>
    <p>
      La conférence technique en région centre sur les nouvelles technologies du numérique
    </p>
    <socials/>
    <div class="mouse_scroll">
      <img
        src="@/assets/img/mouse_scroll.svg"
        alt="scroll">
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  .container--header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    max-width: 100%;
  }

  .logo {
    margin-top: 2rem;
    margin-bottom: 2rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
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

  /deep/ .socials {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .mouse_scroll {
    margin-top: 1rem;
    margin-bottom: 1rem;
    img {
      width: 32px;
      height: 32px;
      animation: 500ms linear scroll;
    }
  }

  @keyframes scroll {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-1rem);
    }
    75% {
      transform: translateY(1rem);
    }
    100% {
      transform: translateY(0);
    }
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
    margin: 3rem auto;
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
      }
    }
    .logo, .title, p, .mouse_scroll {
      margin-top: 1rem;
      margin-bottom: 1rem;
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

