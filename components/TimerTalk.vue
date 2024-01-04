<template>
  <div>
    <div>{{ talk?.talk?.name }}</div>
    <div class="chrono">
      {{ remainingTime.asString }}
    </div>
    <div>Prochain sujet :  {{ talk.nextTalkName }}</div>
  </div>
</template>

<script>
function calculateRemainingTime(endTime) {
  const endDate = new Date();
  endDate.setHours(endTime.split(":")[0], endTime.split(":")[1], 0);
  const currentDate = new Date();
  const remainingInSeconds = (endDate.getTime() - currentDate.getTime()) / 1000;
  return {
    asString: `${Math.floor(remainingInSeconds / 60)} : ${String(Math.floor(remainingInSeconds - (Math.floor(remainingInSeconds / 60) * 60))).padStart(2, '0')}`,
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
    if (this.talk.endTime && this.talk.endTime.split(":")[1] >= currentDate.getMinutes() && this.talk.endTime.split(":")[0] >= currentDate.getHours() ) {
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
