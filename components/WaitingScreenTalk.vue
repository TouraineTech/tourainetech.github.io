<template>
  <div class="waiting-screen--container">
    <div class="waiting-screen--title">
      <h2>{{ talk?.talk?.name }}</h2>
    </div>
    <span class="chrono" :class="{'blink': lowRemainingTime}">
      {{ remainingTime.asString }}
    </span>
    <div class="sponsors--container" />
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

.waiting-screen--container .sponsors--container {
  height: 30vh;
  width: 100vw;
}

.waiting-screen--container .waiting-screen--next-talk {
  height: 2.5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  white-space: nowrap;
}
</style>
