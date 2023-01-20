<template>
  <section id="schedule" class="container--white">
    <div class="container--fix container--center">
      <h2>Le programme</h2>
      <h3>
        L'application du programme <a href="https://apps.apple.com/fr/app/touraine-tech-2022/id1599891078">Apple</a>
        <a href="https://play.google.com/store/apps/details?id=to.chapi.tnt">Android</a>
      </h3>
    </div>
    <br>
    <div class="container-days">
      <div class="schedule-room--cell" :style="{'opacity' : day === 1 ? 1 : 0.5 }" @click="day=1">
        Jeudi
      </div>
      <div class="schedule-room--cell" :style="{'opacity' : day === 2 ? 1 : 0.5 }" @click="day=2">
        Vendredi
      </div>
    </div>
    <div class="schedule--grid">
      <div class="schedule-spacer--cell"></div>
      <div v-for="room of rooms" :key="room" class="schedule-room--cell">
        <h3>{{ room }}</h3>
      </div>
      <div v-for="time of times" :key="time" class="schedule-time--cell">
        {{ time.time }}
      </div>
      <div
        v-for="cell of breaks"
        :key="cell.id"
        :style="talkCellStyle(cell)"
        class="schedule-talk--cell schedule-talk-break--cell"
      >
        {{ cell.name }}
      </div>
      <div
        v-for="talk of talks"
        :key="talk.id"
        :class="talkCssClass(talk)"
        :style="talkCellStyle(talk)"
        :data-time="talk.time"
      >
        <div v-if="talk.day === day">
          <nuxt-link
            :to="`/talk/${talk.id}`"
            :class="{ disabled: talk.id.includes('keynote')}"
          >
            <h4 class="schedule-title">
              {{ talk.title }}
            </h4>
            <h5 v-if="talk.speakerNames" class="schedule-speaker-name">
              {{ talk.speakerNames }}
            </h5>
          </nuxt-link>
          <ul class="schedule-talk-category">
            <li :class="['schedule-talk-'+talk.categories+'--category']">
              {{ talkName(talk.categories) }}
            </li>
          </ul>
          <span class="schedule-talk-videoLinks" v-if="talk.peertubeLink || talk.dailymotionLink || talk.youtubeLink">
            <a v-if="talk.peertubeLink" :href="talk.peertubeLink" target="_blank"><img class="icon"
                                                                                       src="../static/cinema.svg"
                                                                                       alt="icon cinema"
            /></a>
            <a v-if="talk.dailymotionLink" :href="talk.dailymotionLink" target="_blank"><img class="icon"
                                                                                             src="../static/dailymotion.svg"
                                                                                             alt="icon dailymotion"
            /></a>
            <a v-if="talk.youtubeLink" :href="talk.youtubeLink" target="_blank"><img class="icon"
                                                                                     src="../static/youtube.svg"
                                                                                     alt="icon youtube"
            /></a>
          </span>
          <span class="schedule-talk-slidesLinks" v-if="talk.slidesLinks && talk.slidesLinks.length > 0">
            <p
              v-for="slidesLink of talk.slidesLinks"
              :key="slidesLink"
            >
              <a :href="slidesLink" target="_blank"><img class="icon" src="../static/presentation.svg"
                                                         alt="icon presentation"
              /></a>
            </p>
          </span>
          <p class="schedule-room--duration-level">
            ⏱{{ duration(talk.formats) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      day: 2
    }
  },
  computed: {
    talks() {
      return [
        ...this.$store.getters.talks.filter(talk => {
          return talk.day === this.day
        }).map(talk => {
          return {
            ...talk,
            speakerNames: this.$store.getters.getSpeakerForIds(talk.speakers).map(s => s.displayName).join(', ')
          }
        })
      ]
    },
    breaks() {
      return this.$store.getters.breaks.filter(b => b.days.includes(this.day))
    },
    times() {
      return this.$store.getters.times.filter(t => t.days.includes(this.day))
    },
    rooms() {
      return this.$store.getters.rooms
    }
  },
  methods: {
    talkCellStyle({rooms, times, state}) {
      // times.sort(); cause js issue with https or proxy
      if (rooms === undefined) {
        return {
          "display": "none"
        }
      }
      return {
        "opacity" : state === 'accepted' ? 0.5 : 1 ,
        "grid-column-start": rooms[0] + 1,
        "grid-column-end": rooms[rooms.length - 1] + 2,
        "grid-row-start": times[0] + 2,
        "grid-row-end": times[times.length - 1] + 3,
      }
    },
    talkCssClass({formats, categories, times}) {
      const category = {
        "46293012-ca7f-5197-8c58-69bc9a6c7a4b": "design",
        "78e751d2-e8f0-5aca-9e0e-373fc79208c3": "front",
        "87b16802-9e01-5a51-910f-71141789a8b8": "backend",
        "ef452c33-83cf-5472-8e72-acd374e24b58": "iot",
        "63920d15-9b86-58e5-875c-441301f6dbb9": "architecture",
        "18c44d7d-ed48-5dde-94ba-8b4477a84db3": "tools",
        "3035cc9f-f3b2-5164-b9c1-1737e6fd04fa": "game",
        "ed8afd05-a6aa-58e7-a6fd-7413d262a8b9": "alien"
      }[categories];
      const format = {
        "d6fdc077-e3e3-5fe2-bdd4-5af4bc349e2a": "quickie",
        "84638839-c9f7-5eaf-9df5-5fcb578c2c6d": "conference",
        "5c8efbbf-1640-5a9b-b42e-0c1180b82d02": "hands-on"
      }[formats];
      return [
        "schedule-talk--cell",
        "schedule-talk-" + format + "--cell",
        "schedule-talk-time" + times.reduce((a, c) => a + c, "") + "--cell",
        category ? "schedule-talk-" + category + "--cell" : ""
      ];
    },
    talkName(category) {
      return this.$store.getters.categories
        .filter(({id}) => id === category)
        .map(({name}) => name)[0];
    },
    roomName(room) {
      return this.rooms[room - 1];
    },
    levelName(level) {
      switch (level) {
        case "beginner":
          return "Débutant"
        case "intermediate":
          return "Intermédiaire"
        case "hard":
          return "Confirmé"
        default:
          return level
      }
    },
    duration(format) {
      return this.$store.getters.formats
        .filter(({id}) => id === format)
        .map(({name}) => name)[0];
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

$color-iot: #5dbf48;
$color-human: #f3d800;
$color-architecture: #ed5940;
$color-tools: #ffa000;
$color-front: #0077c2;
$color-design: #ff75cc;
$color-backend: #345264;
$color-alien: #066420;

#schedule {
  max-width: 1280px;
  margin: auto;
}

.container-days {
  cursor: pointer;
  display: inline-flex;
  width: 100%;
  min-height: 100%;
  gap: 20px;

  div {
    flex: 0 0 50%;
    border-radius: 10px
  }
}


.schedule--grid {
  display: grid;
  grid-template-columns: 50px repeat(4, minmax(200px, 1fr));
  grid-column-gap: 1rem;
  margin: 1rem;

  @media screen and (max-width: $mobile-step) {
    max-width: 100%;
    overflow-x: scroll;
    margin-left: 0;
    margin-right: 0;
  }
}

.schedule-time--cell {
  position: sticky;
  left: 0;
  z-index: 10;
  background: white;
  grid-column-start: 1;
  color: grey;
  font-size: 0.8rem;
  text-align: right;
  padding-right: 1rem;
  border-right: 1px solid lightgrey;
}

.schedule-spacer--cell {
  grid-column-start: 1;
  grid-row-start: 1;
}

.schedule-room--cell {
  grid-row-start: 1;
  text-align: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: $color-secondary;
  color: white;
}

.schedule-talk--cell {
  text-decoration: none;
  background-color: $color-primary;
  color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 10px solid lightseagreen;
  position: relative;
  padding-bottom: 40px;

  a {
    text-decoration: none;
    color: white;

    h5 {
      color: darken(white, 30%);
    }
  }

  ul {
    padding: 0;
    list-style: none;
    margin: 0.5rem 0 3rem;

    li {
      display: inline-block;
      font-size: 0.8em;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 0.5rem;
    }
  }

  .schedule-room--duration-level {
    display: inline-block;
    color: darken(white, 10%);
    font-size: 0.8rem;
    position: absolute;
    bottom: 5px;
    left: 5px;
    text-align: left;
  }

  .schedule-talk-slidesLinks {
    position: absolute;
    bottom: 2em;
    left: 5px;
    text-align: left;
  }

  .schedule-talk-videoLinks {
    position: absolute;
    bottom: 2em;
    left: 25px;
    text-align: left;

    .icon {
      display: inline-block;
      height: 20px;
      width: 20px;
    }
  }

  p {
    margin-top: 5px;

    .icon {
      display: inline-block;
      height: 16px;
      width: 16px;
    }
  }
}

.schedule-talk-break--cell {
  border: 0;
  color: $color-primary;
  font-weight: 100;
  font-size: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: repeating-linear-gradient(
      45deg,
      lighten($color-secondary, 30%),
      lighten($color-secondary, 30%) 10px,
      lighten($color-secondary, 35%) 10px,
      lighten($color-secondary, 35%) 20px
  );
}

.schedule-talk-iot--cell {
  border-color: $color-iot;
}

.schedule-talk-alien--cell {
  border-color: $color-alien;
}

.schedule-talk-human--cell {
  border-color: $color-human;
}

.schedule-talk-architecture--cell {
  border-color: $color-architecture;
}

.schedule-talk-tools--cell {
  border-color: $color-tools;
}

.schedule-talk-front--cell {
  border-color: $color-front;
}

.schedule-talk-design--cell {
  border-color: $color-design;
}

.schedule-talk-backend--cell {
  border-color: $color-backend;
}

.schedule-talk-iot--category {
  background-color: $color-iot;
  color: black;
}

.schedule-talk-human--category {
  background-color: $color-human;
  color: black;
}

.schedule-talk-architecture--category {
  background-color: $color-architecture;
  color: black;
}

.schedule-talk-tools--category {
  background-color: $color-tools;
  color: black;
}

.schedule-talk-front--category {
  background-color: $color-front;
}

.schedule-talk-design--category {
  background-color: $color-design;
  color: black;
}

.schedule-talk-backend--category {
  background-color: $color-backend;
}

.schedule-talk-conference--cell .schedule-title,
.schedule-talk-quickie--cell .schedule-title,
{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.schedule-speaker-name:before {
  content: "\1F3A4 "
}

.schedule-talk-time1--cell p.schedule-room--duration-level,
.schedule-talk-time21--cell p.schedule-room--duration-level {
  display: none;
}

.disabled {
  color: lightgrey;
  pointer-events: none;
}
</style>

