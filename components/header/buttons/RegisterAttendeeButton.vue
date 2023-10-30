<template>
  <a
    href="#register"
    class="HeaderButton"
  >
    <!--    <span class="HeaderButton-title RegisterAttendee-title">Ouverture de la billetterie le 30 octobre</span>-->
    <span class="HeaderButton-title RegisterAttendee-title">La billetterie est ouverte</span>
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
