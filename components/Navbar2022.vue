<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const store = useMainStore()

defineProps<{
  alwaysVisible?: boolean
}>()

const scrolledToHide = ref(false)
const scrolledToShow = ref(false)

const configuration = computed(() => store.configuration)

const sections = computed(() => {
  const result = [{ name: '#BackToSchool', anchor: '#backtoschool', mobile: false }]
  if (configuration.value.displaySponsors) {
    result.push({ name: 'Sponsors', anchor: '#sponsors', mobile: true })
  }
  if (configuration.value.isCfpOpened) {
    result.push({ name: 'Proposer un talk', anchor: '#cfp', mobile: true })
  }
  if (configuration.value.isRegisterOpen) {
    result.push({ name: 'Billetterie', anchor: '#register', mobile: false })
  }
  if (configuration.value.isScheduleOnline) {
    result.push({ name: 'Nos speakers', anchor: '#speakers', mobile: false })
    result.push({ name: 'Le programme', anchor: '#schedule', mobile: true })
  }
  if (configuration.value.isPhotoOnline) {
    result.push({ name: 'Les photos', anchor: '#pictures', mobile: false })
  }
  if (configuration.value.isVideoOnline) {
    result.push({ name: 'La vidéo', anchor: '#video', mobile: false })
  }
  result.push({ name: "L'équipe", anchor: '#team', mobile: false })
  return result
})

const isHome = () => route.path === '/'

const handleScroll = () => {
  scrolledToHide.value = window.scrollY > 100
  scrolledToShow.value = window.scrollY > window.innerHeight - 200
}

const scrollTo = (target: string) => {
  if (import.meta.client) {
    if (isHome()) {
      location.hash = target
    }
    else {
      router.push(`/${target}`)
    }
  }
  return false
}

const goToHome = () => {
  router.push('/')
}

onMounted(() => {
  if (isHome()) {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (isHome()) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <nav :class="{ 'navbar--hidden': scrolledToHide, 'navbar--visible': scrolledToShow }">
    <div class="Navbar-wrapper">
      <div class="Navbar-logo">
        <img
          src="/img/logo.svg"
          alt="Logo Touraine Tech' 2020"
          @touch="goToHome()"
          @click="goToHome()"
        >
      </div>
      <div class="Navbar-menu">
        <ul>
          <li
            v-for="section in sections"
            :key="section.anchor"
            :class="{ mobile: section.mobile }"
            @touch="scrollTo(section.anchor)"
            @click="scrollTo(section.anchor)"
          >
            <a>{{ section.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

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
