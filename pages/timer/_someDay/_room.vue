<template>
  <div class="container--white fullWidth">
    Room page {{ room }} for day {{ day }}
    <img class="logoContainer" src="@/assets/img/logo.svg" alt="logo TNT" />
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

    const { ["default"]: toto, ["__ob__"]: toto2, ...rest } = talks;
    const enhancedTalks = Object.entries(rest).map(([, talk], index) => {
      return {...talk, endTime: talks[index + 1]?.time, nextTalkId: talks[index + 1]?.talk?.id, nextTalkName: talks[index + 1]?.talk?.name}
    });
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    const filterElement = enhancedTalks.filter(({endTime = "00:00"}) => {
      const splitted = endTime.split(":");
      const endDate = Date.parse(`01/01/2001 ${splitted[0]}:${splitted[1]}:00`)
      const date = Date.parse(`01/01/2001 ${hours}:${minutes}:00`)
      const result = endDate > date;
      console.log({splitted, result})
      return result;
    })[0];
    console.log({filterElement, enhancedTalks, minutes, hours})
    this.currentTalkOnPageLoad = filterElement;
    this.talks = enhancedTalks;
  },
  mounted() {
    setTimeout(() => {
      if (this.currentTalkOnPageLoad?.talk?.id) {
        window.scroll({top: document.getElementById(this.currentTalkOnPageLoad.talk.id).offsetTop});
      } else {
        console.log("No scroll because of no this.currentTalkOnPageLoad.talk.id");
      }

    }, 2000);
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/variables";

.fullWidth {
  width: 100vw;
  background-color: $color-primary;
  color: white;
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
