<template>
  <div class="container--white">
    Room page {{ room }} for day {{ day }}
    <div
      v-for="talk of talks"
      :key="talk?.talk?.id"
      :id="talk?.talk?.id"
      class="talk--bloc"
    >
      <TimerTalk :talk="talk" />
    </div>
  </div>
</template>

<script>
import TimerTalk from "~/components/TimerTalk.vue";

export default {
  components: {
    TimerTalk
  },
  asyncData({params}) {
    return {
      day: params.someDay,
      room: params.room
    };
  },
  data: () => ({
    talks: [],
    currentTalkOnPageLoad: {}
  }),
  async created() {
    const talks = await import(`@/assets/timer/day${this.day}/${this.room}.json`);

    const enhancedTalks = Object.entries(talks).map(([, talk], index) => {
      return {...talk, endTime: talks[index + 1]?.time, nextTalkId: talks[index + 1]?.talk?.id, nextTalkName: talks[index + 1]?.talk?.name}
    });
    const currentDate = new Date();

    this.currentTalkOnPageLoad = enhancedTalks.filter(({endTime = "00:00"}) => endTime.split(":")[1] > currentDate.getMinutes() && endTime.split(":")[0] >= currentDate.getHours())[0];
    this.talks = enhancedTalks;
  },
  mounted() {
    setTimeout(() => {
      window.scroll({top: document.getElementById(this.currentTalkOnPageLoad.talk.id).offsetTop});
    }, 2000);
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/variables";

.talk--bloc {
  height: 100vh
}
</style>
