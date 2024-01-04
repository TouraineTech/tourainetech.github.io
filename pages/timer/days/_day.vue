<template>
  <div class="container--white">
    Day page {{ day }}

    <nuxt-link
      v-for="room of rooms"
      :to="`/timer/days/${day}/rooms/${room}`"
      :key="`${room}${day}`"
    >
      <h4>
        Salle {{ room }}
      </h4>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData({store, params}) {
    const rooms = store.getters.rooms;

    return {
      day: params.day,
      rooms
    };
  }
}
</script>
