<template>
  <section class="Header-container">
    <div class="Header-wrapper">
      <div class="Header-phrase">
        <HeaderPhrase></HeaderPhrase>
      </div>
      <div class="Header-buttons">
        <SeeScheduleButton></SeeScheduleButton>
      </div>
    </div>
  </section>
</template>

<script>
import SeeScheduleButton from "~/components/header/buttons/SeeScheduleButton.vue"
import HeaderPhrase from "~/components/header/HeaderPhrase.vue";

export default {
  components: {
    SeeScheduleButton,
    HeaderPhrase
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables";
.Header {
  &-container {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    @media screen and (min-width: $mobile-step) {
      height: 80vh;
      min-height: 600px;
    }
    background-image: linear-gradient(rgba(white, 1), rgba(white, 0.8) 90%),
      url(~assets/img/cover_home.jpg);
    background-position: 50% 50%;
    background-size: cover;
    .Header-wrapper {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      @media screen and (min-width: $mobile-step) {
        flex-direction: row;
      }
      max-width: 1200px;
      margin: auto;
      margin-bottom: 5rem;
      .Header-phrase {
        flex: 1;
        align-self: flex-end;
      }
      .Header-buttons {
        align-self: center;
        @media screen and (min-width: $mobile-step) {
          align-self: flex-end;
        }
        flex: 1;
        justify-items: right;
        max-width: 400px;
        margin: 1rem;
        a + a {
          margin-top: 1rem;
        }
      }
    }
  }
}
</style>
