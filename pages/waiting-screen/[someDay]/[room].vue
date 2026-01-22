<script setup lang="ts">
definePageMeta({
  layout: 'naked',
})

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
const store = useMainStore()
const goldSponsors = computed(() => [...store.sponsors].filter(({ type }) => type === 'gold'))
const otherSponsors = computed(() => [...store.sponsors].filter(({ type }) => type !== 'gold'))

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
  <div class="fullWidth">
    <div class="talk--header">
      <img src="/img/logo_TNT26.png" alt="logo TNT" />
    </div>
    <div class="talk--illustration">
      <img src="/img/visualArt/illustration_2026.png" alt="illustration" />
    </div>
    <div class="talk--sponsors--container">
      <span>Merci à nos sponsors</span>
      <div class="talk--sponsors">
        <div class="talk--sponsors--row">
          <img
            v-for="sponsor in goldSponsors"
            :key="sponsor.id"
            :src="`/img/sponsors/${sponsor.image}`"
            :alt="sponsor.name"
            class="gold"
          />
        </div>
        <div class="talk--sponsors--row">
          <img
            v-for="sponsor in otherSponsors"
            :key="sponsor.id"
            :src="`/img/sponsors/${sponsor.image}`"
            :alt="sponsor.name"
          />
        </div>
      </div>
    </div>
    <div
      v-for="talk of talks"
      :id="talk?.talk?.id"
      :key="talk?.talk?.id"
    >
      <WaitingScreenTalk :talk="talk" :room="room" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.fullWidth {
  width: 100vw;
  overflow-x: hidden;
  background-color: #54988a;
  color: #fff;
}

.talk--header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 15vh;
  display: flex;
  justify-content: flex-end;
  padding: 2.5vh 2vw;
  z-index: 10;
}

.talk--header img {
  height: 5vh;
}

.talk--illustration {
  position: fixed;
  bottom: calc(35vh + 2.5rem);
  left: 5vw;
  z-index: 9;
  display: flex;
}

.talk--illustration img {
  height: 30vh;
}

.talk--sponsors--container {
  position: fixed;
  bottom: calc(10vh + 2.5rem);
  left: 0;
  width: 100vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  padding: 2vh 5vw;
  background-color: #fff;
  color: #1C1D21;
  z-index: 10;
}

.talk--sponsors--container > span {
  font-size: 1.15rem;
  font-weight: bold;
  flex-shrink: 0;
  text-decoration: underline;
  color: #54988a;
}

.talk--sponsors--container > .talk--sponsors {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 2vh;
  flex-grow: 1;
}

.talk--sponsors--container .talk--sponsors .talk--sponsors--row {
  display: flex;
  align-items: center;
  gap: 5vw;
  flex-shrink: 0;
}

.talk--sponsors--container .talk--sponsors .talk--sponsors--row img {
  max-height: 7.5vh;
  max-width: 10vh;
}

.talk--sponsors--container .talk--sponsors .talk--sponsors--row img.gold {
  max-height: 15vh;
  max-width: 20vh;
}
</style>
