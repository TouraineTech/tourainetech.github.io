<template>
  <div class="regie--room">
    <h2>{{ title }}</h2>
    <div class="regie--room--frames">
      <iframe
        allowfullscreen
        :src="obs"
      ></iframe>
      <iframe
        allowfullscreen
        :src="youtube"
      ></iframe>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default() {
        return "";
      }
    },
    obs: {
      type: String,
      default() {
        return "";
      }
    },
    youtube: {
      type: String,
      default() {
        return "";
      }
    }
  }
}
</script>

<style>
.regie--room {
  display: flex;
  flex-direction: column;
  gap: 8px;
}.regie--room>h2 {
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0;
}
.regie--room--frames {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.regie--room--frames>iframe {
  width: calc((100% - 8px) / 2);
  height: 100%;
}
@media only screen and (max-width: 1600px) {
  .regie--room--frames>iframe {
    height: calc((100% - 8px) / 2);
    width: 100%;
  }
}
</style>
