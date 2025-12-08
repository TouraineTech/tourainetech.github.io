<script setup lang="ts">
interface Talk {
  name: string
  speakers: string[]
}

const props = withDefaults(defineProps<{
  talk?: Talk
}>(), {
  talk: () => ({ name: '', speakers: [] })
})

const store = useMainStore()
const speakers = computed(() => store.getSpeakerForIds(props.talk.speakers))
</script>

<template>
  <div class="talk--bloc">
    <h3>{{ talk.name }}</h3>
    <div class="talk-speakers--grid">
      <div v-for="speaker in speakers" :key="speaker.name">
        <SpeakerBloc :speaker="speaker" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  @import "./../assets/scss/variables";

  .talk--bloc{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    background-color: $color-primary;
    box-shadow: 0 0 5px lightgrey;
    border-radius: 2px;
    padding: 1rem;
    color: white;
    height: 100%;

    h3{
      font-weight: 100;
      font-size: 1.3rem;
    }

    .talk-speakers--grid {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
</style>
