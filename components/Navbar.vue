<template>
  <nav :class="{'navbar--visible': scrolled, 'navbar--fixed': alwaysVisible}">
    <img
      @touch="goToHome()"
      @click="goToHome()"
      src="../assets/img/logo.svg"
      alt="Logo Touraine Tech' 2019"
    >
    <ul>
      <li
        v-for="section in sections"
        :key="section.anchor"
        @touch="scrollTo(section.anchor)"
        @click="scrollTo(section.anchor)"
        :class="{'mobile': section.mobile}"
      ><a>{{ section.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    alwaysVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrolled: false,
      sections: [
        { name: "#BackToSchool", anchor: "#backtoschool", mobile: false },
        { name: "Sponsors", anchor: "#sponsors", mobile: true },
        //{name: 'Inscription', anchor: '#register', mobile: true},
        //{name: 'Talks', anchor: '#talks', mobile: true},
        { name: "Le programme", anchor: "#schedule", mobile: true },
        { name: "L'équipe", anchor: "#team", mobile: false },
        { name: "L'actu", anchor: "#news", mobile: false }
      ]
    };
  },
  created() {
    if (process.browser && this.isHome()) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    if (process.browser && this.isHome()) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > window.innerHeight - 100;
    },
    scrollTo(target) {
      if (process.browser) {
        if (this.isHome()) {
          window.scrollTo({
            behavior: "smooth",
            top: document.querySelector(target).offsetTop - 70
          });
        } else {
          this.$router.push(`/${target}`);
        }
      }
      return false;
    },
    goToHome() {
      this.$router.push("/");
    },
    isHome() {
      return this.$route.path === "/";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

@media screen and (max-width: $tablet-step - 1) {
  nav {
    li:not(.mobile) {
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
  border-bottom: 1px solid $color-secondary;
  justify-content: center;

  &.navbar--visible {
    transform: translateY(0px);
  }

  &.navbar--fixed {
    transform: translateY(0);
  }

  img {
    margin: 8px 1rem;
    max-height: 48px;
    cursor: pointer;
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
