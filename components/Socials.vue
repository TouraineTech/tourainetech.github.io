<template>
  <div class="socials">
    <ul>
      <li><a
          href="https://twitter.com/tourainetech"
          target="_blank"
        >
          <img
            src="@/assets/img/twitter.png"
            alt="Twitter logo"
          >
        </a></li>
      <li><a
          href="https://www.facebook.com/tourainetech/"
          target="_blank"
        >
          <img
            src="@/assets/img/facebook.png"
            alt="Facebook logo"
          >
        </a></li>
      <li><a
          href="https://www.youtube.com/channel/UC4apQIHE7viAVy1oO5Ruq2w"
          target="_blank"
        >
          <img
            src="@/assets/img/youtube.png"
            alt="Youtube logo"
          >
        </a></li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
@import "./../assets/scss/variables";

.socials ul {
  justify-content: center;
  padding: 0;
  list-style: none;
  display: flex;

  margin-left: -0.5rem;
  margin-right: -0.5rem;

  li {
    margin: 0 0.5rem;

    img {
      width: 35px;
      height: 35px;
      border-radius: 5px;
    }
  }
}
</style>
