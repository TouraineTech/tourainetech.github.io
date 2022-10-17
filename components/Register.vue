<template>
  <section
    id="register"
    class="container--green"
  >
    <div class="container--fix container--center">
      <h2>Billetterie</h2>
      <div class="PriceBloc-wrapper">
        <a
          class="PriceBloc PriceBloc--soldOut PriceBloc--early"
        >
          <h3 class="PriceBloc-title">Early-bird</h3>
          <div class="PriceBloc-price">25 €</div>
          <div class="PriceBloc-quota">places limitées</div>
        </a>
        <a
          class="PriceBloc  PriceBloc--soldOut PriceBloc--soldOut--wave"
        >
          <h3 class="PriceBloc-title">Plein tarif</h3>
          <div class="PriceBloc-price">37 €</div>
        </a>
      </div>


      <span class="RegisterButton"> * Le premier lot de places est déjà épuisé, rendez-vous le 08/11 à 13h pour la deuxième salve !</span>
      <div>
        <a
          href="https://billetterie.touraine.tech"
          target="_blank"
          class="RegisterButton button--link button--white"
        >Achetez votre place !</a>
      </div>

      <!--      <div class="RegisterHelp">-->
      <!--        <span>* Votre billet vous donne accès à toutes les conférences, aux pauses café et au repas. L’hébergement et le transport ne sont pas inclus dans ce prix.</span>-->
      <!--      </div>-->

      <!-- <span class="RegisterButton">Ouverture de la billeterie le 13 octobre 2022 à 13h00</span> -->
      <!--      <div>-->
      <!--        <a-->
      <!--          href="https://www.helloasso.com/associations/touraine-tech/evenements/tourainetech-22"-->
      <!--          target="_blank"-->
      <!--          class="RegisterButton button&#45;&#45;link button&#45;&#45;white"-->
      <!--        >Lien vers la billeterie HelloAsso</a>-->
      <!--      </div>-->

      <div class="RegisterHelp">
        <span>Votre billet vous donne accès à toutes les conférences, aux pauses café et aux repas des jeudi et vendredi midi. L’hébergement et le transport ne sont pas inclus dans ce prix.</span>
      </div>

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
  display: block;
  text-decoration: none;
  background-color: white;
  color: $color-primary;
  flex: 1;
  margin: 1rem;
  padding: 1rem;
  transition: all 100ms ease-in-out;
  @media screen and (min-width: $mobile-step) {
    margin: 2rem;
    padding: 1rem;
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

  &--soldOut {
    &--wave {
      &:before {
        content:"ÉPUISÉ *" !important;
      }
    }
    &:before {
      content:"ÉPUISÉ";
      font-size: 3rem;
      color: white;
      background-color: #222333;
      display: inline-block;
      transform: rotate(-45deg);
      position: relative;
      top: 2em;
      width: 5em;
    }
    &:hover {
      transform: none;
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

.RegisterHelp {
  margin-top: 2rem;
  color: white;
  font-size: 0.8rem;
}
</style>
