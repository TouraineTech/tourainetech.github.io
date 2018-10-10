<template>
  <div class="socials">
    <ul>
      <li><a href="https://twitter.com/tourainetech" target="_blank">
        <img src="@/assets/img/twitter.png">
      </a></li>
      <li><a href="https://www.facebook.com/tourainetech/" target="_blank">
        <img src="@/assets/img/facebook.png">
      </a></li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  .socials ul{
    justify-content: center;
    padding: 0;
    list-style: none;
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
</style>
