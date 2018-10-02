<template>
  <footer>
    <div class="footer--links">
      <ul>
        <li><a rel="noreferrer" href="http://confcodeofconduct.com/index-fr.html" target="_blank">Code de conduite</a>
        </li>
      </ul>
    </div>
    <div class="footer--socials">
      <ul>
        <li><a href="https://twitter.com/tourainetech" target="_blank">
          <img src="@/assets/img/twitter.png">
        </a></li>
        <li><a href="https://www.facebook.com/tourainetech/" target="_blank">
          <img src="@/assets/img/facebook.png">
        </a></li>
      </ul>
    </div>
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

    .footer--socials ul{
      display: flex;

      margin-left: -0.5rem;
      margin-right: -0.5rem;

      li{
        margin: 0 0.5rem;

        img{
          width: 35px;
          height: 35px;
          border-radius: 5px;
        }
      }
    }
  }
</style>
