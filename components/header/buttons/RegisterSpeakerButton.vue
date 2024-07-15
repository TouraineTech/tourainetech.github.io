<template>
  <a
    href="https://cfp.touraine.tech"
    target="_blank"
    class="HeaderButton"
  >
    <span class="HeaderButton-title RegisterSpeaker-title">Devenez speaker·euse</span>
    <span class="HeaderButton-subtitle RegisterSpeaker-subtitle">dépêchez-vous, fermeture du CFP le 31/10/2023 à 23h59</span>
  </a>
</template>

<style lang="scss" scoped>
@import "./../../../assets/scss/variables";
a {
  background-color: $color-primary;
  color: white;

  &:focus {
    outline-color: $color-secondary;
  }
}
</style>
