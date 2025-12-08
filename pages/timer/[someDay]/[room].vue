<script setup lang="ts">
const route = useRoute()

const day = computed(() => route.params.someDay as string)
const room = computed(() => route.params.room as string)

interface TalkData {
  time: string
  talk?: {
    id: string
    name: string
  }
}

interface EnhancedTalk extends TalkData {
  endTime?: string
  nextTalkId?: string
  nextTalkName?: string
}

const talks = ref<EnhancedTalk[]>([])
const currentTalkOnPageLoad = ref<EnhancedTalk | null>(null)

onMounted(async () => {
  try {
    const talksData = await import(`~/assets/timer/day${day.value}/${room.value}.json`)
    const talksArray = talksData.default as TalkData[]

    const enhancedTalks = talksArray.map((talk, index) => {
      return {
        ...talk,
        endTime: talksArray[index + 1]?.time,
        nextTalkId: talksArray[index + 1]?.talk?.id,
        nextTalkName: talksArray[index + 1]?.talk?.name,
      }
    })

    const currentDate = new Date()
    const minutes = currentDate.getMinutes()
    const hours = currentDate.getHours()

    const filterElement = enhancedTalks.filter(({ endTime = '00:00' }) => {
      const splitted = endTime.split(':')
      const endDate = Date.parse(`01/01/2001 ${splitted[0]}:${splitted[1]}:00`)
      const date = Date.parse(`01/01/2001 ${hours}:${minutes}:00`)
      return endDate > date
    })[0]

    currentTalkOnPageLoad.value = filterElement
    talks.value = enhancedTalks

    setTimeout(() => {
      if (currentTalkOnPageLoad.value?.talk?.id) {
        const element = document.getElementById(currentTalkOnPageLoad.value.talk.id)
        if (element) {
          window.scroll({ top: element.offsetTop })
        }
      }
    }, 2000)
  }
  catch (e) {
    console.error('Error loading timer data:', e)
  }
})
</script>

<template>
  <div class="container--white fullWidth">
    Room page {{ room }} for day {{ day }}
    <img class="logoContainer" src="/img/logo.svg" alt="logo TNT">
    <div
      v-for="talk of talks"
      :id="talk?.talk?.id"
      :key="talk?.talk?.id"
      class="talk--bloc"
    >
      <TimerTalk :talk="talk" :room="room" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.fullWidth {
  width: 100vw;
  background-color: $color-primary;
  color: white;
  overflow-x: hidden;
}
.talk--bloc {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.logoContainer {
  position: sticky;
  top: 2vh;
  left: 95vw;
  height: 10vh;
  filter: drop-shadow(0px 0px 5px #fff);
}
</style>
