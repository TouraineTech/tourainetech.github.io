<template>
  <nav :class="{'navbar--visible': scrolled}">
    <img
      src="../assets/img/logo.svg"
      alt="Logo Touraine Tech' 2019">
    <ul>
      <li v-for="section in sections" :key="section.anchor" @touch="scrollTo(section.anchor)" @click="scrollTo(section.anchor)" :class="{'mobile': section.mobile}"><a>{{ section.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        scrolled: false,
        sections: [
          {name: '#BackToSchool', anchor: '#backtoschool', mobile: false},
          {name: 'Sponsors', anchor: '#sponsors', mobile: true},
          {name: 'Inscription', anchor: '#register', mobile: true},
          {name: 'L\'équipe', anchor: '#team', mobile: false},
          {name: 'L\'actu', anchor: '#news', mobile: false},
          {name: 'CFP', anchor: '#cfp', mobile: true},
        ]
      }
    },
    created() {
      if (process.browser) {
        window.addEventListener('scroll', this.handleScroll)
      }
    },
    destroyed() {
      if (process.browser) {
        window.removeEventListener('scroll', this.handleScroll)
      }
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > (window.innerHeight - 100)
      },
      scrollTo(target) {
        if (process.browser) {
          window.scrollTo({
            "behavior": "smooth",
            "top": document.querySelector(target).offsetTop - 70
          })
          return false
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  @media screen and (max-width: $tablet-step - 1) {
    nav {
      li:not(.mobile){
        display: none;
      }

      img {
        display: none;
      }
    }
  }

  nav {
    display: flex;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-1000px);
    transition: 300ms ease-in-out;
    z-index: 1000;
    box-shadow: transparentize($color-primary, 0.8) 3px 3px 3px;
    justify-content: center;

    &.navbar--visible {
      transform: translateY(0px);
    }

    img {
      margin: 8px 1rem;
      max-height: 48px;
    }

    ul {
      display: flex;
      list-style: none;
      padding: 0;

      li {
        padding: 1.3rem 1rem;
        cursor: pointer;
        background-color: white;
        transition: 300ms ease-in-out;
        &:hover {
          background-color: lighten($color-secondary, 30%);
        }
        a {
          color: $color-primary;
        }
      }
    }
  }
</style>
