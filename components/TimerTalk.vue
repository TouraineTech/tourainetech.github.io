<template>
  <div class="timerTalk" :class="`timerTalk-${room}`">
    <h1>{{ talk?.talk?.name }}</h1>
    <h2 class="chrono" :class="{'blink': lowRemainingTime}">
      {{ remainingTime.asString }}
    </h2>
    <Sponsors class="sponsors" />
    <h3>Prochain sujet :  {{ talk.nextTalkName }}</h3>
  </div>
</template>

<script>
import Sponsors from "@/components/TimerSponsors.vue";

function calculateRemainingTime(endTime) {
  const endDate = new Date();
  endDate.setHours(endTime.split(":")[0], endTime.split(":")[1], 0);
  const currentDate = new Date();
  const remainingInSeconds = (endDate.getTime() - currentDate.getTime()) / 1000;
  return {
    asString: `${String(Math.floor(remainingInSeconds / 60)).padStart(2, '0')} : ${String(Math.floor(remainingInSeconds - (Math.floor(remainingInSeconds / 60) * 60))).padStart(2, '0')}`,
    remainingInSeconds
  };
}

function calculateTime(endTime, startTime) {
  const endDate = new Date();
  endDate.setHours(endTime.split(":")[0], endTime.split(":")[1], 0);
  const startDate = new Date();
  startDate.setHours(startTime.split(":")[0], startTime.split(":")[1], 0);
  const remainingInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
  return {
    asString: `${String(Math.floor(remainingInSeconds / 60)).padStart(2, '0')} : ${String(Math.floor(remainingInSeconds - (Math.floor(remainingInSeconds / 60) * 60))).padStart(2, '0')}`,
    remainingInSeconds
  };
}

export default {
  components: {Sponsors},
  props: {
    room: {
      type: String,
      default() {return "F21"}
    },
    talk: {
      type: Object,
      default () {
        return {
          time: "00:00",
          talk: {
            name: "No name",
            id: "random"
          },
          endTime: "00:00",
          nextTalkId: "random"
        }
      }
    }
  },
  data: () => ({
    remainingTime: {},
    intervalId: null,
    lowRemainingTime: false
  }),
  mounted() {
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    const splitted = (this.talk.endTime || "00:00").split(":");
    const endDate = Date.parse(`01/01/2001 ${splitted[0]}:${splitted[1]}:00`)
    const date = Date.parse(`01/01/2001 ${hours}:${minutes}:00`)
    const talksDuration = calculateTime(this.talk.endTime || "00:00", this.talk.time)
    if (this.talk.endTime && endDate > date) {
      this.intervalId = setInterval(() => {
        const remainingTime = calculateRemainingTime(this.talk.endTime);
        if (remainingTime.remainingInSeconds < talksDuration.remainingInSeconds/10) {
          this.lowRemainingTime = true;
        }
        if (remainingTime.remainingInSeconds < 0) {
          window.scroll({top: document.getElementById(this.talk.nextTalkId).offsetTop});
          clearInterval(this.intervalId)
        }
        this.remainingTime = remainingTime;
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

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

.sponsors {
  display: none;
}

@media (min-width: 1300px) {
  .timerTalk {
    background-size: 100vw 100vh;
  }

  .timerTalk-F21 {
    background-image: url('~assets/img/visualArt/fondF21.png');
    background-size: 100vw 100vh;
  }
  .timerTalk-F22 {
    background-image: url('~assets/img/visualArt/fondF22.png');
    background-size: 100vw 100vh;
  }
  .timerTalk-Physique {
    background-image: url('~assets/img/visualArt/fondPhysique.png');
    background-size: 100vw 100vh;
  }
  .timerTalk-Bio {
    background-image: url('~assets/img/visualArt/fondBio.png');
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

  .sponsors {
    display: flex;
    align-self: end;
    position: sticky;
    width: 300%;
    height: 20vh;
    max-width: 150%;
    overflow-x: hidden;
  }
}
</style>
