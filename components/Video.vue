<template>
  <section
    id="aftermovie"
    class="container--white"
  >
    <div class="container--fix container--center">
      <h2>L'aftermovie</h2>
      <div class="embed-container">
        <iframe
          src="https://www.dailymotion.com/embed/video/x77qljc"
          frameborder="0"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      </div>
      <p>
        Un grand merci à <a
          target="_blank"
          href="https://lescousins.co/"
        >LES COUSINS</a> pour la réalisation de cette vidéo
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

#aftermovie {
  border-top: 1rem solid $color-secondary;
}
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  margin-bottom: 1rem;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

