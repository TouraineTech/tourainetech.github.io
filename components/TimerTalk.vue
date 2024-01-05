<template>
  <div class="timerTalk">
    <h1>{{ talk?.talk?.name }}</h1>
    <h2 class="chrono">
      {{ remainingTime.asString }}
    </h2>
    <h3>Prochain sujet :  {{ talk.nextTalkName }}</h3>
  </div>
</template>

<script>
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
export default {
  props: {
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
    intervalId: null
  }),
  mounted() {
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    const splitted = (this.talk.endTime || "00:00").split(":");
    const endDate = Date.parse(`01/01/2001 ${splitted[0]}:${splitted[1]}:00`)
    const date = Date.parse(`01/01/2001 ${hours}:${minutes}:00`)
    if (this.talk.endTime && endDate > date) {
      this.intervalId = setInterval(() => {
        const remainingTime = calculateRemainingTime(this.talk.endTime);
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

.timerTalk h1, .timerTalk h2, .timerTalk h3 {
  width:100%;
  display: flex;
  justify-content: center;
}

.timerTalk h1 {
  font-size: 4rem;
}

.timerTalk h2 {
  font-size: 8rem;
  font-weight: bold;
}
.timerTalk h3 {
  font-size: large;
}
</style>
