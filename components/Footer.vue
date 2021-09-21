<template>
  <footer>
    <div class="footer--links">
      <ul>
        <li>
          <a
            rel="noreferrer"
            href="http://confcodeofconduct.com/index-fr.html"
            target="_blank"
          >Code de conduite</a>
        </li>
        <li><a
            rel="noreferrer"
            href="/press_kit.zip"
            target="_blank"
          >Press kit</a></li>
        <li><a
            rel="noreferrer"
            href="https://2020.touraine.tech/"
            target="_blank"
          >Édition 2020</a></li>
        <li><a
            rel="noreferrer"
            href="https://2019.touraine.tech/"
            target="_blank"
          >Édition 2019</a></li>
        <li><a
            rel="noreferrer"
            href="https://2018.touraine.tech/"
            target="_blank"
          >Édition 2018</a></li>
      </ul>
    </div>
    <Socials />
  </footer>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

footer {
  display: flex;

  .footer--links {
    li {
      margin: 1rem 0;
    }
  }

  @media screen and (max-width: $mobile-step) {
    display: block;

    .footer--links {
      margin-bottom: 2rem;
    }
  }
}
</style>


<script>
import Socials from "~/components/Socials.vue";

export default {
  components: {
    Socials
  }
};
</script>

