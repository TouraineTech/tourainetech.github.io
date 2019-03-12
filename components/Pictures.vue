<template>
  <section
    id="pictures"
    class="container--green"
  >
    <div class="container--fix container--center">
      <h2>Les photos</h2>
      <iframe
        style="position: relative; top: 0; left: 0; width: 100%; height: 100%;"
        src="https://flickrembed.com/cms_embed.php?source=flickr&layout=responsive&input=www.flickr.com/photos/164202300@N04/albums/72157705429724171&sort=3&by=album&theme=grid_left&scale=fill&speed=15000&limit=100&skin=default-light&autoplay=true"
        scrolling="no"
        frameborder="0"
        allowFullScreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
      ></iframe>

    </div>
  </section>
</template>

<style lang="scss" scoped>
#pictures {
  height: 600px;
}
.container--fix {
  height: 100%;
}
</style>
