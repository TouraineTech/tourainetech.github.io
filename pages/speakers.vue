<template>
  <div class="page--speakers">
    <TopSpeakers/>
  </div>
</template>

<script>
  import TopSpeakers from '~/components/TopSpeakers'
  
  export default {
    components: {
      TopSpeakers
    },
  }
</script>

<style lang="scss" scoped>
.page--speakers{
  margin-top: 2rem;
}
</style>
