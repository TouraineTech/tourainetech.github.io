<template>
  <div class="page--schedule">
    <Schedule :for-app="true" />
  </div>
</template>

<script>
  import Schedule from '~/components/Schedule'

  export default {
    components: {
      Schedule
    },
    layout: 'naked',
  }
</script>

<style lang="scss" scoped>
.page--schedule {
  margin-top: -2rem;
}
</style>
