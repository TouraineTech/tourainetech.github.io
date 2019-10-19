<template>
  <div class="HeaderPhrase">
    <h1 class="HeaderPhrase-title">Touraine <span class="HeaderPhrase-title--green">Tech</span> #20</h1>
    <div class="HeaderPhrase-date">31 janvier 2020</div>
    <div class="HeaderPhrase-hour">8h30 — 18h30</div>
    <div class="HeaderPhrase-place">à Tours</div>
    <h2 class="HeaderPhrase-subtitle">3<sup>ème</sup> édition</h2>
  </div>
</template>

<style lang="scss" scoped>
@import "./../../assets/scss/variables";

.HeaderPhrase {
  padding: 1rem;
  &-title {
    font-size: 3.5rem;
    font-weight: bold;
    &--green {
      color: $color-secondary;
    }
  }

  &-date {
    font-size: 2rem;
    letter-spacing: 0.3rem;
  }

  &-hour {
    font-size: 1.5rem;
    letter-spacing: 0.5rem;
  }

  &-place {
    font-size: 2rem;
    letter-spacing: 0.5rem;
  }

  &-subtitle {
    margin-top: 1rem;
    font-weight: 300;
    font-size: 1.1rem;
  }
}
</style>
