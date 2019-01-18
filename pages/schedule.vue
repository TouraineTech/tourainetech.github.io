<template>
  <div class="page--schedule">
    <Schedule/>
  </div>
</template>

<script>
  import Schedule from '~/components/Schedule'
  
  export default {
    components: {
      Schedule
    },
  }
</script>

<style lang="scss" scoped>
.page--schedule {
  margin-top: 2rem;
}
</style>
