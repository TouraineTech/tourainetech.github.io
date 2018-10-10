<template>
  <footer>
    <div class="footer--links">
      <ul>
        <li><a rel="noreferrer" href="http://confcodeofconduct.com/index-fr.html" target="_blank">Code de conduite</a>
        </li>
      </ul>
    </div>
    <Socials/>
  </footer>
</template>

<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  footer{
    display: flex;

    @media screen and (max-width: $mobile-step) {
      display: block;

      .footer--links{
        margin-bottom: 2rem;
      }
    }
  }
</style>


<script>
  import Socials from '~/components/Socials.vue'

  export default {
    components: {
      Socials
    }
  }
</script>

