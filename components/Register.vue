<template>
  <section id="register" class="container--green register-section">
    <div class="register-card container--fix container--center">
      <div class="register-icon">
        <!-- Ticket SVG icon -->
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="none" />
          <path d="M21 5v2a2 2 0 0 1 0 4v2a2 2 0 0 1 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 0-4V9a2 2 0 0 1 0-4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#5ec3b6" />
        </svg>
      </div>
      <h2 class="register-title">
        Billetterie
      </h2>
      <div class="register-badge">
        Ouverture de la billetterie le mardi 7 octobre 2025 à 12h30
      </div>
      <div>
        <a
          href="https://billetterie26.touraine.tech"
          target="_blank"
          class="register-btn"
        >
          <span class="register-btn-icon" aria-hidden="true">🎟️</span> Achetez votre place !
        </a>
      </div>
      <div class="PriceBloc-wrapper">
        <div class="PriceBloc-row">
          <div class="PriceBloc PriceBloc--early PriceBloc--soldOut">
            <h3 class="PriceBloc-title">
              Early-bird
            </h3>
            <div class="PriceBloc-price">
              50 €
            </div>
            <div class="PriceBloc-quota">
              places limitées
            </div>
          </div>
          <div class="PriceBloc">
            <h3 class="PriceBloc-title">
              Plein tarif
            </h3>
            <div class="PriceBloc-price">
              70 €
            </div>
          </div>
        </div>
        <div class="PriceBloc-row PriceBloc-row--single">
          <div class="PriceBloc">
            <h3 class="PriceBloc-title">
              T-shirt
            </h3>
            <div class="PriceBloc-price">
              20 €
            </div>
          </div>
        </div>
      </div>
      <div class="RegisterHelp">
        <span>Votre billet vous donne accès à toutes les conférences, aux pauses café et aux repas des jeudi et vendredi midi. L’hébergement et le transport ne sont pas inclus dans ce prix.</span>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
<style lang="scss" scoped>
@use "./../assets/scss/variables" as *;

.register-section {
  padding: 4rem 0;
  background: #5ec3b6;
}
.register-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.12);
  padding: 3rem 2rem 2.5rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.register-icon {
  margin-bottom: 1.2rem;
}
.register-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #222;
}
.register-badge {
  display: inline-block;
  background: #e0f7f4;
  color: #21867b;
  font-weight: 600;
  border-radius: 16px;
  padding: 0.5em 1.2em;
  font-size: 1.1rem;
  margin-bottom: 2.2rem;
}
.register-btn {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(90deg, #5ec3b6 0%, #43e97b 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.7rem 2.2rem;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(94, 195, 182, 0.15);
  text-decoration: none;
  transition: transform 0.12s, box-shadow 0.12s;
  margin-bottom: 2.5rem;
}
.register-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 18px rgba(94, 195, 182, 0.22);
}
.register-btn-icon {
  font-size: 1.3em;
  margin-right: 0.5em;
  line-height: 1;
}
.PriceBloc-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.PriceBloc-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}
.PriceBloc-row--single {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: $mobile-step) {
  .PriceBloc-row,
  .PriceBloc-row--single {
    flex-direction: column;
    display: flex;
    gap: 0;
    align-items: center;
  }
  .PriceBloc {
    margin: 1rem auto;
    padding: 1.2rem 0.5rem 1rem 0.5rem;
  }
  .register-card {
    padding: 2rem 0.5rem 1.5rem 0.5rem;
  }
  .register-title {
    font-size: 1.4rem;
  }
}
.PriceBloc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  background-color: #fff;
  color: $color-primary;
  flex: unset;
  margin: 1rem;
  padding: 2rem 1rem 1.5rem 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(60, 60, 60, 0.08);
  transition: transform 0.12s, box-shadow 0.12s;
  max-width: 320px;
  width: 100%;
  min-height: 200px;

  @media screen and (min-width: $mobile-step) {
    margin: 2rem auto;
    padding: 2rem 1rem 1.5rem 1rem;
    min-height: 240px;
    &:hover {
      transform: scale(1.07);
      box-shadow: 0 8px 32px rgba(60, 60, 60, 0.13);
    }
  }
  &-title {
    font-size: 2rem;
    color: $color-secondary;
    margin-bottom: 1.2rem;
  }
  &-price {
    font-size: 2rem;
    @media screen and (min-width: $mobile-step) {
      font-size: 4rem;
    }
    font-weight: bold;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }
  &-quota {
    color: #388e3c;
    background: #e0f7f4;
    border-radius: 10px;
    padding: 0.2em 0.8em;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.5em;
    height: 1.8em;
    display: flex;
    align-items: center;
  }

  // Ajout d'un élément invisible pour maintenir l'alignement
  &:not(.PriceBloc--early):after {
    content: "";
    height: 1.8em;
    margin-top: 0.5em;
    visibility: hidden;
  }

  &--soldOut {
    position: relative;
    overflow: hidden;

    &:before {
      content: "ÉPUISÉ";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      background: linear-gradient(45deg, #e74c3c, #c0392b);
      color: white;
      font-size: 1.8rem;
      font-weight: bold;
      padding: 0.5rem 3rem;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
      z-index: 10;
      border-radius: 4px;
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      z-index: 5;
    }


    &:hover {
      transform: none !important;
      box-shadow: 0 4px 18px rgba(60, 60, 60, 0.08) !important;
    }
  }
  &--closed {
    position: relative;
    overflow: hidden;

    &:before {
      content: "FERMÉ";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      background: linear-gradient(45deg, #6c757d, #495057);
      color: white;
      font-size: 1.8rem;
      font-weight: bold;
      padding: 0.5rem 3rem;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);
      z-index: 10;
      border-radius: 4px;
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      z-index: 5;
    }

    * {
      position: relative;
      z-index: 1;
      opacity: 0.3;
    }

    &:hover {
      transform: none !important;
      box-shadow: 0 4px 18px rgba(60, 60, 60, 0.08) !important;
    }
  }
}

// Mode fermé pour toute la section
.register-card--closed {
  position: relative;
  overflow: hidden;

  &:before {
    content: "BILLETTERIE FERMÉE";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    background: linear-gradient(45deg, #6c757d, #495057);
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    padding: 1rem 4rem;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(108, 117, 125, 0.4);
    z-index: 100;
    border-radius: 6px;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.85);
    z-index: 50;
  }

  * {
    position: relative;
    z-index: 1;
    opacity: 0.4;
  }

  .register-btn {
    pointer-events: none;
    opacity: 0.3 !important;
  }
}
.RegisterHelp {
  margin-top: 2rem;
  color: #21867b;
  font-size: 0.95rem;
  background: #e0f7f4;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  display: inline-block;
}
.PriceBloc-row--single .PriceBloc {
  flex: unset;
  max-width: 320px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (max-width: $mobile-step) {
  .register-card {
    padding: 2rem 0.5rem 1.5rem 0.5rem;
  }
  .register-title {
    font-size: 1.4rem;
  }
}
</style>
