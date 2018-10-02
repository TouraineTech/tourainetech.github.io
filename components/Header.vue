<template>
  <section class="container--header">
    <div>
      <img
        src="../assets/logo.svg"
        alt="Logo Touraine Tech' 2019">
      <h1 class="title">
        Touraine Tech'
      </h1>
      <h2 class="subtitle">
        01 février 2019
      </h2>
      <p>
        La première conférence technique en région centre sur les nouvelles technologies du numérique
      </p>
    </div>
    <img
      class="mouse_scroll"
      src="../assets/mouse_scroll.svg"
      alt="scroll">
  </section>
</template>

<style lang="scss">
  @import "./../assets/scss/variables";

  img{
    max-width: 100%;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
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
    background: url("../assets/cover_home.jpg") 50% 50%;
    background-size: cover;
  }
</style>
