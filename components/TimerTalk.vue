<template>
  <div class="timerTalk" :class="`timerTalk-${room}`">
    <h1>{{ talk?.talk?.name }}</h1>
    <h2 class="chrono" :class="{'blink': lowRemainingTime}">
      {{ remainingTime.asString }}
    </h2>
    <div class="container--sponsors">
      <TimerSponsors class="sponsors" />
    </div>
    <h3>Prochain sujet :  {{ talk.nextTalkName }}</h3>
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

.timerTalk {
  //border: 2px solid yellow;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow-x: hidden;
}

.timerTalk h1, .timerTalk h2, .timerTalk h3 {
  width:100%;
  display: flex;
  justify-content: center;
}

.timerTalk h1 {
  width: 85%;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  font-size: 3rem;
  height: 30vh;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timerTalk h2 {
  font-size: 10rem;
  font-weight: bold;
  height: 40vh;
}
.timerTalk h3 {
  font-size: large;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.container--sponsors {
  display: none;
}

@media (min-width: 1300px) {
  .timerTalk {
    background-size: 100vw 100vh;
  }

  .timerTalk-F21 {
    background-image: url('/img/visualArt/fondF21.png');
    background-size: 100vw 100vh;
  }
  .timerTalk-F22 {
    background-image: url('/img/visualArt/fondF22.png');
    background-size: 100vw 100vh;
  }
  .timerTalk-Physique {
    background-image: url('/img/visualArt/fondPhysique.png');
    background-size: 100vw 100vh;
  }
  .timerTalk-Bio {
    background-image: url('/img/visualArt/fondBio.png');
    background-size: 100vw 100vh;
  }

  .timerTalk h1 {
    width: 100%;
    margin-top: 25vh;
    height: 5vh;
    text-align: center;
  }

  .timerTalk h2 {
    font-size: 6rem;
    font-weight: bold;
    height: 10vh;
  }
  .timerTalk h3 {
    font-size: xxx-large;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .container--sponsors {
    background-color: rgba(255, 255, 255, 0.8);
    display: block;
    position: sticky;
    height: 20vh;
    margin: 2vh 0;
  }

  .sponsors {
    margin: auto;
    display: flex;
    align-self: end;
    height: 100%;
    max-width: 150%;
  }
}
</style>
