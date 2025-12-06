<script setup lang="ts">
const route = useRoute()
const store = useMainStore()

const day = computed(() => route.params.day)
const rooms = computed(() => store.rooms)
</script>

<template>
  <div class="container--white">
    Day page {{ day }}

    <NuxtLink
      v-for="room of rooms"
      :key="`${room}${day}`"
      :to="`/timer/${day}/${room}`"
    >
      <h4>
        Salle {{ room }}
      </h4>
    </NuxtLink>
  </div>
</template>
