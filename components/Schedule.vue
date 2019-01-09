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
      <nuxt-link 
        :to="`/talk/${talk.id}`"
        v-for="talk of talks" 
        :key="talk.id" 
        :class="talkCssClass(talk)"
        :style="talkCellStyle(talk)"
        :data-time="talk.time">
        <div>
          <h4>{{ talk.name }}</h4>
          <h5>{{ talk.speakerNames }}</h5>
          <ul>
            <li :class="['schedule-talk-'+talk.categories+'--category']">{{ talkName(talk.categories) }}</li>
          </ul>
          <p class="schedule-room--duration-level">⏱{{ duration(talk.format) }} — {{ levelName(talk.level) }}</p>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
    data () {
        return {
            times: [
                "8:00",
                "9:00",
                "9:50",
                "10:10",
                "11:00",
                "11:10",
                "12:00",
                "12:20",
                "12:45",
                "13:00",
                "13:30",
                "14:20",
                "14:30",
                "15:20",
                "15:45",
                "16:35",
                "16:45",
                "17:35",
                "18:00",
            ],
            rooms: [
                "Turing",
                "Pascal",
                "LoveLace",
                "TD1 (premier étage)"
            ]
        }
    },
    computed: {
      talks() {
        let confirmedSpeakersId = this.$store.getters.speakers.map(s => s.id)
        return [
            ...this.$store.getters.talks.map(talk => {
                return {
                    ...talk,
                    speakerNames: this.$store.getters.getSpeakerForIds(talk.speakers).map(s => s.name).join(', ')  
                }
            })
        ]
      },
      breaks() {
        return this.$store.getters.breaks
      },
    },
    methods: {
        talkCellStyle({rooms, times, format}) {
            if(rooms === undefined){
                return {
                    "display": "none"
                }
            }
            return {
                "grid-column-start": rooms[0] + 1,
                "grid-column-end": rooms[rooms.length - 1] + 2,
                "grid-row-start": times[0] + 1,
                "grid-row-end": times[times.length - 1] + 2,
            }
        },
        talkCssClass({format, categories}) {
            return [
                "schedule-talk--cell",
                "schedule-talk-"+format+"--cell",
                categories ? "schedule-talk-" + categories + "--cell" : ""
            ]
        },
        talkName(category) {
          switch(category){
              case 'design': return "Design, UI, UX"
              case 'front': return "Front web, mobile"
              case 'backend': return "Backends, Clouds, Big Data"
              case 'game': return "Jeux vidéos et hybrides"
              case 'iot': return "Internet des objets"
              case 'architecture': return "Conception, architecture"
              case 'tools': return "Outillage, pratiques de développement"
          }
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
            switch(format) {
                case "conference": return "50m"
                case "quickie": return "15m"
                case "handson": return "1h50"
                case "keynoteend": return "25m"
            }
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

#schedule{
    max-width: 1280px;
    margin: auto;
}
.schedule--grid {
    display: grid;
    grid-template-columns: 50px repeat(4, 1fr);
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

    h5{
        color: darken(white, 30%);
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

</style>

