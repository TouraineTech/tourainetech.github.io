<template>
  <section id="header" class="Header-container">
    <div class="Header-wrapper">
      <div class="Header-phrase">
        <HeaderPhrase></HeaderPhrase>
      </div>
      <div class="Header-buttons">
        <HeaderButtonsSeeScheduleButton v-if="configuration.isScheduleOnline" />
        <HeaderButtonsRegisterSpeakerButton v-if="configuration.isCfpOpen" />
        <HeaderButtonsBeginnerSpeakerLink v-if="configuration.isCfpOpen" />
        <HeaderButtonsRegisterAttendeeButton v-if="configuration.isRegisterOpen && !configuration.isSoldOut" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const store = useMainStore();
const configuration = computed(() => store.configuration);
</script>

<style lang="scss" scoped>
@use "./../assets/scss/variables" as *;
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
      url(/img/cover_home.jpg);
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
