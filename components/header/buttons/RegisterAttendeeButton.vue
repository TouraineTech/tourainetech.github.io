<template>
  <a
    href="#register"
    class="HeaderButton"
  >
    <span class="HeaderButton-title RegisterAttendee-title">Ouverture de la billetterie le 7 octobre à 12h30</span>
    <!--    <span class="HeaderButton-title RegisterAttendee-title">La billetterie est ouverte</span>-->
  </a>
</template>

<style lang="scss" scoped>
@import "./../../../assets/scss/variables";
.HeaderButton {
  background-color: $color-secondary;
  color: $color-primary;
  &:focus {
    outline-color: $color-primary;
  }
}
</style>
