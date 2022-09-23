<template>
  <div class="homepage-hero-module">
    <div class="homepage-header-bg"></div>
    <div class="homepage-header">
      <h1>Touraine <span>Tech'</span> #5</h1>
      <div class="homepage-info">
        <label>Date</label>
        <div>vendredi 31 janvier 2020</div>
      </div>
      <div class="homepage-info">
        <label>Lieu</label>
        <div>Polytech'Tours</div>
      </div>
    </div>
    <div class="homepage-footer">
      <div>
        <h2>La conférence technique en région centre sur les nouvelles technologies du numérique</h2>
      </div>
      <!-- <h3>Tenez-vous au courant des dernières nouveautés en vous inscrivant à notre newsletter</h3>
      <div class="homepage-footer-register">
        <input type="email" placeholder="john@doe.fr">
        <button type="button">S'inscrire</button>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

.homepage-hero-module {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  background: white;

  .homepage-header {
    grid-column: 1;
    grid-row: 1;
    padding-right: 10%;
    display: flex;
    flex-direction: column;
  }

  .homepage-header-bg {
    grid-column: 1;
    grid-row: 1;
    background-image: url('./../assets/img/logo.svg');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 50%;
    opacity: 0.05;
  }

  .homepage-footer {
    grid-column: 1;
    grid-row: 2;
    background-color: $color-secondary;
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    padding-bottom: 3rem;
    padding-right: 1rem;
    padding-left: 1rem;

    h2 {
      color: white;
      margin: auto;
      text-align: center;
      font-weight: 300;
      font-size: 1.6rem;
      //margin-bottom: 2rem;
      max-width: 600px;
    }

    h3 {
      color: white;
      margin: auto;
      text-align: center;
      font-weight: 300;
      font-size: 14pt;
      margin-top: 1rem;
      margin-bottom: 1rem;
      max-width: 600px;
    }

    @media screen and (max-width: $mobile-step) {
      h2 {
        font-size: 1.2rem;
      }

      h3 {

      }
    }

    .homepage-footer-register {
      display: flex;
      width: 80%;
      max-width: 600px;
      margin: auto;

      input {
        flex: 1 0;
        text-align: center;
        font-size: 18pt;
        padding: 1rem;
        outline: 0;
        border: 0;
        border-radius: 2rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      button{
        flex: 0 1;
        border-radius: 2rem;
        background-color: $color-primary;
        color: white;
        outline: 0;
        border: 0;
        font-size: 14pt;
        padding: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        text-transform: uppercase;
        letter-spacing: 2pt;
      }
    }
  }

  h1 {
    text-align: right;
    margin-top: 3rem;
    margin-bottom: 5rem;

    color: $color-primary;
    font-size: 7rem;
    font-weight: 500;
    letter-spacing: -3pt;

    @media screen and (max-width: $mobile-step) {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    span {
      color: $color-secondary;
    }
  }

  .homepage-info {
    text-align: right;

    label {
      color: $color-secondary;
      text-transform: uppercase;
      letter-spacing: 4pt;
      font-size: 1.5rem;
      font-weight: bold;
    }

    div {
      font-size: 2.5rem;
      color: $color-primary;
    }

    & + .homepage-info {
      margin-top: 2rem;
      margin-bottom: 5rem;
    }

    @media screen and (max-width: $mobile-step) {
      label {
        font-size: 1rem;
      }

      div {
        font-size: 1.2rem;
      }
    }
  }
}
</style>

<script>
</script>
