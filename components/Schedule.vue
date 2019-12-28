<template>
  <section id="schedule" class="container--white">
    <div class="container--fix container--center">
      <h2>Le programme</h2>
    </div>
    <div class="schedule--grid">
      <div class="schedule-spacer--cell"></div>
      <div v-for="room of rooms" :key="room" class="schedule-room--cell">
        <h3>{{ room }}</h3>
      </div>
      <div v-for="time of times" :key="time" class="schedule-time--cell">{{ time }}</div>
      <div
        v-for="cell of breaks"
        :key="cell.id"
        :style="talkCellStyle(cell)"
        class="schedule-talk--cell schedule-talk-break--cell">
        {{ cell.name }}
      </div>
      <div
        v-for="talk of talks"
        :key="talk.id"
        :class="talkCssClass(talk)"
        :style="talkCellStyle(talk)"
        :data-time="talk.time"
      >
        <div>
          <nuxt-link
            :to="`/talk/${talk.id}`"
          >
            <h4 class="schedule-title">{{ talk.title }}</h4>
            <h5 v-if="talk.speakerNames" class="schedule-speaker-name"> {{ talk.speakerNames }}</h5>
          </nuxt-link>
          <ul>
            <li :class="['schedule-talk-'+talk.categories+'--category']">{{ talkName(talk.categories) }}</li>
          </ul>
          <p v-if="talk.peertubeLink || talk.dailymotionLink">
            <a :href="talk.peertubeLink" target="_blank"><img class="icon" src="../static/cinema.svg" alt="icon cinema"/></a>
            <a v-if="talk.dailymotionLink" :href="talk.dailymotionLink" target="_blank"><img class="icon" src="../static/dailymotion.svg" alt="icon dailymotion"/></a>
          </p>
          <span v-if="talk.slidesLinks && talk.slidesLinks.length > 0">
            <p
              v-for="slidesLink of talk.slidesLinks"
              :key="slidesLink"
            >
              <a :href="slidesLink" target="_blank"><img class="icon" src="../static/presentation.svg" alt="icon presentation"/></a>
            </p>
          </span>
          <p class="schedule-room--duration-level">⏱{{ duration(talk.formats) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    computed: {
      talks() {
        return [
            ...this.$store.getters.talks.map(talk => {
              return {
                ...talk,
                speakerNames: this.$store.getters.getSpeakerForIds(talk.speakers).map(s => s.displayName).join(', ')
              }
            })
        ]
      },
      breaks() {
        return this.$store.getters.breaks
      },
      times() {
        return this.$store.getters.times
      },
      rooms() {
        return this.$store.getters.rooms
      }
    },
    methods: {
        talkCellStyle({rooms, times}) {
            times.sort();
            if(rooms === undefined){
                return {
                    "display": "none"
                }
            }
            return {
                "grid-column-start": rooms[0] + 1,
                "grid-column-end": rooms[rooms.length - 1] + 2,
                "grid-row-start": times[0] + 2,
                "grid-row-end": times[times.length - 1] + 3,
            }
        },
        talkCssClass({formats, categories, times}) {
          const category = {
            "46293012-ca7f-5197-8c58-69bc9a6c7a4b":"design",
            "96440de7-ddfa-5d09-b206-64ecb4ec86c0": "front",
            "ae14e3b6-2476-58d7-a629-f130574251bd": "backend",
            "7af0e2b1-708d-5a28-9e44-b1fe0ef856a8": "game",
            "9fc85ea1-2256-54f1-886f-246090b0e764": "iot",
            "63920d15-9b86-58e5-875c-441301f6dbb9": "architecture",
            "18c44d7d-ed48-5dde-94ba-8b4477a84db3": "tools",
            "ed8afd05-a6aa-58e7-a6fd-7413d262a8b9": "alien"
          }[categories];
          const format = {
            "d6fdc077-e3e3-5fe2-bdd4-5af4bc349e2a": "quickie",
            "84638839-c9f7-5eaf-9df5-5fcb578c2c6d": "conference",
            "5c8efbbf-1640-5a9b-b42e-0c1180b82d02": "hands-on"
          }[formats];
          return [
            "schedule-talk--cell",
            "schedule-talk-"+format+"--cell",
            "schedule-talk-time"+times.reduce((a, c) => a+c, "")+"--cell",
            category ? "schedule-talk-" + category + "--cell" : ""
          ];
        },
        talkName(category) {
          return this.$store.getters.categories
            .filter(({id}) => id === category)
            .map(({name})=> name)[0];
        },
        roomName(room) {
            return this.rooms[room - 1];
        },
        levelName(level) {
            switch(level) {
                case "beginner": return "Débutant"
                case "intermediate": return "Intermédiaire"
                case "hard": return "Confirmé"
                default: return level
            }
        },
        duration(format) {
          return this.$store.getters.formats
            .filter(({id}) => id === format)
            .map(({name})=> name)[0];
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

$color-iot: #5dbf48;
$color-game: #f3d800;
$color-architecture: #ed5940;
$color-tools: #ffa000;
$color-front: #0077c2;
$color-design: #ff75cc;
$color-backend: #345264;
$color-alien: #066420;

#schedule{
    max-width: 1280px;
    margin: auto;
}
.schedule--grid {
    display: grid;
    grid-template-columns: 50px repeat(5, 1fr);
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

.schedule-spacer--cell{
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
    border-left:10px solid lightseagreen;
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
        margin: 0;
        padding: 0;
        list-style: none;
        margin-top: 0.5rem;
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
        lighten($color-secondary,30%),
        lighten($color-secondary,30%) 10px,
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

.schedule-talk-game--cell {
    border-color: $color-game;
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

.schedule-talk-game--category {
    background-color: $color-game;
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
.schedule-talk-time2--cell p.schedule-room--duration-level,
.schedule-talk-time18--cell p.schedule-room--duration-level {
  display: none;
}
</style>

