<template>
  <a class="beginner-speakers-link" href="#beginner-speakers">Speaker débutant ? On vous accompagne !</a>
</template>

<style lang="scss" scoped>
@import "./../../../assets/scss/variables";
.HeaderButton {
  background-color: $color-primary;
  color: white;

  &:focus {
    outline-color: $color-secondary;
  }
}

.beginner-speakers-link {
  display: block;
  font-size: 0.9em;
  color: $color-secondary;
  text-align: center;
}
</style>
