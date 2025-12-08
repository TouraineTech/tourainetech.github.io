<script setup lang="ts">
const props = withDefaults(defineProps<{
  alwaysVisible?: boolean
}>(), {
  alwaysVisible: false
})

const router = useRouter()
const route = useRoute()

const scrolled = ref(false)

const sections = [
  { name: '#BackToSchool', anchor: '#backtoschool', mobile: false },
  { name: 'Sponsors', anchor: '#sponsors', mobile: true },
  { name: 'Le programme', anchor: '#schedule', mobile: true },
  { name: "L'équipe", anchor: '#team', mobile: false },
  { name: "L'actu", anchor: '#news', mobile: false }
]

function isHome() {
  return route.path === '/'
}

function handleScroll() {
  scrolled.value = window.scrollY > window.innerHeight - 100
}

function scrollTo(target: string) {
  if (import.meta.client) {
    if (isHome()) {
      const el = document.querySelector(target)
      if (el) {
        window.scrollTo({
          behavior: 'smooth',
          top: (el as HTMLElement).offsetTop - 70
        })
      }
    } else {
      router.push(`/${target}`)
    }
  }
  return false
}

function goToHome() {
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
  <nav :class="{'navbar--visible': scrolled, 'navbar--fixed': alwaysVisible}">
    <img
      @touch="goToHome()"
      @click="goToHome()"
      src="/img/logo.svg"
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

<style lang="scss" scoped>
@use "sass:color";
@use "./../assets/scss/variables" as *;

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
        background-color: color.adjust($color-secondary, $lightness: 30%);
      }
      a {
        color: $color-primary;
      }
    }
  }
}
</style>
