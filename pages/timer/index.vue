<script setup lang="ts">
const store = useMainStore()
const days = computed(() => store.days)
</script>

<template>
  <div class="container--white">
    Welcome
    <NuxtLink
      v-for="day of days"
      :key="day"
      :to="`/timer/${day}`"
    >
      <h4>
        Jour {{ day }}
      </h4>
    </NuxtLink>
  </div>
</template>
