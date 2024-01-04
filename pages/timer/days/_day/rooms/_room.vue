<template>
  <div>
    Room page {{ room }} for day {{ day }}
  </div>
</template>

<script>
export default {
  asyncData({store, params}) {
    return {
      day: params.day,
      room: params.room
    };
  }
}
</script>
