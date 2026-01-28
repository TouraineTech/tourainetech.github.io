<template>
  <div class="waiting-screen--container">
    <div class="waiting-screen--title">
      <h2>{{ talk?.talk?.name }}</h2>
    </div>
    <span class="chrono" :class="{'blink': lowRemainingTime}">
      {{ remainingTime.asString }}
    </span>
    <div class="talk--sponsors--container">
      <span>Merci à nos sponsors</span>
      <div class="talk--sponsors">
        <div class="talk--sponsors--gold">
          <img
            v-for="sponsor in goldSponsors"
            :key="sponsor.id"
            :src="`/img/sponsors/${sponsor.image}`"
            :alt="sponsor.name"
          />
        </div>
        <div class="talk--sponsors--silver">
          <img
            v-for="sponsor in silverSponsors"
            :key="sponsor.id"
            :src="`/img/sponsors/${sponsor.image}`"
            :alt="sponsor.name"
          />
        </div>
        <div class="talk--sponsors--bronze">
          <img
            v-for="sponsor in bronzeSponsors"
            :key="sponsor.id"
            :src="`/img/sponsors/${sponsor.image}`"
            :alt="sponsor.name"
          />
        </div>
      </div>
      <div class="illustration">
        <img :src="`/img/visualArt/illustration_2026.png`" alt="illustration" />
      </div>
    </div>
    <div class="waiting-screen--next-talk">
      <span v-if="talk.nextTalkName"><b>Prochain sujet :</b> {{ talk.nextTalkName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Talk {
  time: string
  talk: {
    name: string
    id: string
  }
  endTime: string
  nextTalkId: string
  nextTalkName?: string
}

interface RemainingTime {
  asString: string
  remainingInSeconds: number
}

const props = defineProps<{
  room?: string
  talk?: Talk
}>()

const remainingTime = ref<RemainingTime>({ asString: '00 : 00', remainingInSeconds: 0 })
const intervalId = ref<number | null>(null)
const lowRemainingTime = ref(false)

const store = useMainStore()
const goldSponsors = computed(() => [...store.sponsors].filter(({ type }) => type === 'gold'))
const silverSponsors = computed(() => [...store.sponsors].filter(({ type }) => type === 'silver'))
const bronzeSponsors = computed(() => [...store.sponsors].filter(({ type }) => type === 'bronze'))

function calculateRemainingTime(endTime: string): RemainingTime {
  const endDate = new Date();
  endDate.setHours(Number(endTime.split(":")[0]), Number(endTime.split(":")[1]), 0);
  const currentDate = new Date();
  const remainingInSeconds = (endDate.getTime() - currentDate.getTime()) / 1000;
  return {
    asString: `${String(Math.floor(remainingInSeconds / 60)).padStart(2, '0')} : ${String(Math.floor(remainingInSeconds - (Math.floor(remainingInSeconds / 60) * 60))).padStart(2, '0')}`,
    remainingInSeconds
  };
}

function calculateTime(endTime: string, startTime: string): RemainingTime {
  const endDate = new Date();
  endDate.setHours(Number(endTime.split(":")[0]), Number(endTime.split(":")[1]), 0);
  const startDate = new Date();
  startDate.setHours(Number(startTime.split(":")[0]), Number(startTime.split(":")[1]), 0);
  const remainingInSecondsVal = (endDate.getTime() - startDate.getTime()) / 1000;
  return {
    asString: `${String(Math.floor(remainingInSecondsVal / 60)).padStart(2, '0')} : ${String(Math.floor(remainingInSecondsVal - (Math.floor(remainingInSecondsVal / 60) * 60))).padStart(2, '0')}`,
    remainingInSeconds: remainingInSecondsVal
  };
}

onMounted(() => {
  if (!props.talk) return

  const currentDate = new Date();
  const minutes = currentDate.getMinutes();
  const hours = currentDate.getHours();
  const splitted = (props.talk.endTime || "00:00").split(":");
  const endDate = Date.parse(`01/01/2001 ${splitted[0]}:${splitted[1]}:00`)
  const date = Date.parse(`01/01/2001 ${hours}:${minutes}:00`)
  const talksDuration = calculateTime(props.talk.endTime || "00:00", props.talk.time)

  if (props.talk.endTime && endDate > date) {
    intervalId.value = window.setInterval(() => {
      if (!props.talk) return

      const remaining = calculateRemainingTime(props.talk.endTime);
      if (remaining.remainingInSeconds < talksDuration.remainingInSeconds/10) {
        lowRemainingTime.value = true;
      }
      if (remaining.remainingInSeconds < 0) {
        const nextElement = document.getElementById(props.talk.nextTalkId)
        if (nextElement) {
          window.scroll({top: nextElement.offsetTop});
        }
        if (intervalId.value) {
          clearInterval(intervalId.value)
        }
      }
      remainingTime.value = remaining;
    }, 500);
  }
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<style lang="scss" scoped>
@use "../assets/scss/variables" as *;

.waiting-screen--container {
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  padding-top: 10vh;
  padding-bottom: 5vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
}

.waiting-screen--title {
  flex-grow: 1;
  display: flex;
  align-items: center;
  max-width: 90vw;
}

.waiting-screen--container .waiting-screen--title h2 {
  text-align: center;
  font-size: 3rem;
}

.waiting-screen--container span.chrono {
  font-size: 6rem;
  font-weight: bold;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.waiting-screen--container span.chrono.blink {
  animation: blinker 1s linear infinite;
}

.waiting-screen--container .talk--sponsors--container {
  position: relative;
  height: 30vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  padding: 0 2vw;
}

.waiting-screen--container .talk--sponsors--container .illustration {
  position: absolute;
  bottom: calc(100% - 24px - 2vh);
  left: 5vw;
  display: flex;
}

.waiting-screen--container .talk--sponsors--container .illustration img {
  height: 30vh;
}

.waiting-screen--container .talk--sponsors--container > span {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 24px;
  font-size: 1rem;
  color: #fff;
  font-style: italic;
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors {
  display: grid;
  row-gap: 1vh;
  column-gap: 1vw;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--gold,
.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--silver,
.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--bronze {
  display: flex;
  gap: 2vh;
  border: 2px solid;
  border-radius: 1vw;
  background-color: #fff;
  overflow: hidden;
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--gold {
  grid-column: 1;
  grid-row: 1 / 3;
  padding: 2vh 2vw;
  flex-direction: column;
  border-color: #ffc300;
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--gold img ,
.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--silver img ,
.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--bronze img {
  object-fit: contain;
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--gold img {
  max-width: 100%;
  height: calc((100% - 2vh) / 2);
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--silver,
.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--bronze {
  justify-content: center;
  padding: 1vh 2vw;
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--silver {
  grid-column: 2 / 4;
  grid-row: 1;
  border-color: #d3d3d3;
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--bronze {
  grid-column: 2 / 4;
  grid-row: 2;
  border-color: #bb9a93;
}

.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--silver img,
.waiting-screen--container .talk--sponsors--container .talk--sponsors .talk--sponsors--bronze img  {
  height: 100%;
  max-width: calc((100% - 4vw) / 5);
}

.waiting-screen--container .waiting-screen--next-talk {
  height: 2.5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  white-space: nowrap;
}
</style>
