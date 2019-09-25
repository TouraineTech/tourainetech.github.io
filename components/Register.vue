<template>
  <section
    id="register"
    class="container--green"
  >
    <div class="container--fix container--center">
      <h2>Billetterie</h2>
      <div class="PriceBloc-wrapper">
        <div class="PriceBloc PriceBloc--bigger">
          <h3 class="PriceBloc-title">Early-bird</h3>
          <div class="PriceBloc-price">18,50 €</div>
          <div class="PriceBloc-quota">20 places ????</div>
        </div>
        <div class="PriceBloc">
          <h3 class="PriceBloc-title">Plein tarif</h3>
          <div class="PriceBloc-price">25 €</div>
          <div class="PriceBloc-quota">20 places ????</div>
        </div>
      </div>

      <span class="RegisterButton">Ouverture de la billeterie le 30 septembre 2019</span>
      <!-- <a class="RegisterButton button--link button--white">Lien vers la billeterie HelloAsso</a> -->
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

.PriceBloc {
  &-wrapper {
    display: flex;
    flex-direction: row;
    @media screen and (max-width: $mobile-step) {
      display: block;
    }
  }

  background-color: white;
  color: $color-primary;
  flex: 1;
  margin: 1rem;
  padding: 1rem;
  transition: all 100ms ease-in-out;
  @media screen and (min-width: $mobile-step) {
    margin: 2rem;
    padding: 2rem;
    &:hover {
      transform: scale(1.1);
    }
  }

  @media screen and (min-width: $mobile-step) {
    &--bigger {
      transform: scale(1.2);
      &:hover {
        transform: scale(1.3);
      }
    }
  }

  &-title {
    font-size: 2rem;
    color: $color-secondary;
  }
  &-price {
    font-size: 2rem;
    @media screen and (min-width: $mobile-step) {
      font-size: 4rem;
    }
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  &-quota {
    color: grey;
    font-size: 0.9rem;
  }
}

.RegisterButton {
  display: inline-block;
  margin-top: 4rem;
}
</style>
