<template>
  <nav :class="{'navbar--hidden': scrolledToHide, 'navbar--visible': scrolledToShow}">
    <div class="Navbar-wrapper">
      <div class="Navbar-logo">
        <img
          @touch="goToHome()"
          @click="goToHome()"
          src="../assets/img/logo.svg"
          alt="Logo Touraine Tech' 2020"
        >
      </div>
      <div class="Navbar-menu">
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
      </div>
    </div>
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
      scrolledToHide: false,
      scrolledToShow: false,
      sections: [
        { name: "#BackToSchool", anchor: "#backtoschool", mobile: false },
        { name: "Sponsors", anchor: "#sponsors", mobile: true },
        //{ name: "Billetterie", anchor: "#register", mobile: false },
        //{ name: "Nos speakers", anchor: "#speakers", mobile: false },
        //{ name: "Le programme", anchor: "#schedule", mobile: true },
        { name: "L'équipe", anchor: "#team", mobile: false },
        //{ name: "Les vidéos", anchor: "#video", mobile: false },
        //{name: 'Inscription', anchor: '#register', mobile: true},
        //{name: 'Talks', anchor: '#talks', mobile: true},
        //{ name: "L'actu", anchor: "#news", mobile: false }
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
      this.scrolledToHide = window.scrollY > 100;
      this.scrolledToShow = window.scrollY > window.innerHeight - 200;
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
  }
}

nav {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: 300ms ease-in-out;
  z-index: 1000;
  justify-content: center;
  opacity: 1;

  &.navbar--hidden {
    transform: translateY(-100px);
    opacity: 0;
  }

  &.navbar--visible {
    transform: translateY(0);
    background: white;
    opacity: 1;
    position: fixed;
  }

  .Navbar {
    &-wrapper {
      display: flex;
      max-width: 1200px;
      width: 100%;
    }
    &-logo {
      flex: 0;
      display: flex;
      align-items: center;
      @media screen and (max-width: $mobile-step) {
        justify-content: center;
        flex: 1;
      }
    }
    &-menu {
      flex: 1;
      @media screen and (max-width: $tablet-step - 1) {
        li:not(.mobile) {
          display: none;
        }
      }
      @media screen and (max-width: $mobile-step) {
        display: none;
      }
    }
  }

  img {
    margin: 8px 1rem;
    max-height: 36px;
    cursor: pointer;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: flex-end;

    li {
      padding: 1.3rem 1rem;
      cursor: pointer;
      transition: 300ms ease-in-out;
      &:hover {
        background-color: $color-secondary;
      }
      a {
        color: $color-primary;
      }
    }
  }
}
</style>
