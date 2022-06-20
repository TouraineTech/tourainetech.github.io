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
          >
            <a>{{ section.name }}</a>
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
    const configuration = this.$store.getters.configuration;
    const sections = [        { name: "#BackToSchool", anchor: "#backtoschool", mobile: false }];
    if(configuration.displaySponsors) {
      sections.push({ name: "Sponsors", anchor: "#sponsors", mobile: true })
    }

    if(configuration.isRegisterOpen) {
      sections.push({ name: "Billetterie", anchor: "#register", mobile: false })
    }
    if(configuration.isScheduleOnline) {
      sections.push({ name: "Nos speakers", anchor: "#speakers", mobile: false })
      sections.push({ name: "Le programme", anchor: "#schedule", mobile: true })
    }
    if(configuration.isVideoOnline) {
      sections.push({ name: "Les photos", anchor: "#pictures", mobile: false })
      sections.push({ name: "La vidéo", anchor: "#video", mobile: false })
    }
    sections.push(        { name: "L'équipe", anchor: "#team", mobile: false },)
    return {
      scrolledToHide: false,
      scrolledToShow: false,
      sections: sections
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
          location.hash = target
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
