<template>
  <section
    id="video"
    class="container--white"
  >
    <div class="container--fix container--center">
      <h2>Les vidéos</h2>
      <div class="embed-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/C93gIFfDN-o"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="embed-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/BG-rNKlCngs"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <p>
        Un grand merci à <a
          target="_blank"
          href="https://lescousins.co/"
        >LES COUSINS</a> pour la réalisation et le montage de ces vidéos
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

#video {
  border-top: 1rem solid $color-secondary;

  h4 {
    font-weight: 300;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
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

