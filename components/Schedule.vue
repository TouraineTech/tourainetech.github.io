<script setup lang="ts">
const props = withDefaults(defineProps<{
  forApp?: boolean
}>(), {
  forApp: false
})

const store = useMainStore()
const route = useRoute()
const day = ref(parseInt(route.query.day as string) || 1)

function setDay(newDay: number) {
  day.value = newDay
  const url = new URL(window.location.href)
  url.searchParams.set('day', String(newDay))
  window.history.replaceState({}, '', url)
}

const talks = computed(() => {
  return store.talks
    .filter(talk => talk.day === day.value)
    .map(talk => ({
      ...talk,
      speakerNames: store.getSpeakerForIds(talk.speakers).map(s => s.name).join(', ')
    }))
})

const breaks = computed(() => store.breaks.filter(b => b.days.includes(day.value)))
const times = computed(() => store.times.filter(t => t.days.includes(day.value)))
const rooms = computed(() => store.rooms)
const categories = computed(() => store.categories)
const formats = computed(() => store.formats)

function talkCellStyle({ rooms, times, state }: { rooms?: number[], times?: number[], state?: string }) {
  if (rooms === undefined) {
    return {
      display: 'none'
    }
  }
  return {
    opacity: state === 'accepted' ? 0.5 : 1,
    'grid-column-start': rooms[0] + 1,
    'grid-column-end': rooms[rooms.length - 1] + 2,
    'grid-row-start': times![0] + 2,
    'grid-row-end': times![times!.length - 1] + 3,
  }
}

function talkCssClass({ formats: formatId, categories: categoryId, times: timesArr }: { formats?: string, categories?: string, times?: number[] }) {
  const category: Record<string, string> = {
    // Legacy IDs (2025 and before)
    'clzyaamxk102o13hpbki089rf': 'design',
    'clzyaamxk102p13hpw8tzwls8': 'front',
    'clzyaamxk102q13hp7nja505n': 'backend',
    'clzyaamxk102r13hpan99q8vi': 'iot',
    'clzyaamxk102s13hpkwipk45v': 'architecture',
    'clzyaamxk102t13hp9akxg5en': 'tools',
    'clzyaamxk102u13hpzlab3f0w': 'human',
    'clzyaamxk102v13hplgi4r5fy': 'alien',
    // New text names (2026+)
    'Design, UI, UX': 'design',
    'Front web, design, UI, UX': 'front',
    'Backend, Cloud, Big Data': 'backend',
    'IOT, embarqué, mobile': 'iot',
    'Conception, architecture': 'architecture',
    'Outils, pratiques de dev': 'tools',
    'Humain & Tech': 'human',
    'Alien': 'alien',
    'Intelligence Artificielle': 'ia'
  }
  const format: Record<string, string> = {
    // Legacy IDs
    'clzyaamxk102w13hpk1e1095a': 'lightning',
    'clzyaamxk102x13hp665tzg4v': 'conference',
    'clzyaamxk102y13hp61scz1oh': 'hands-on',
    // New text names
    'Lightning (15min)': 'lightning',
    'Conférence (50min)': 'conference',
    'Hands-on (120min)': 'hands-on'
  }
  return [
    'schedule-talk--cell',
    'schedule-talk-' + (format[formatId || ''] || '') + '--cell',
    'schedule-talk-time' + (timesArr?.reduce((a, c) => a + c, 0) || '') + '--cell',
    category[categoryId || ''] ? 'schedule-talk-' + category[categoryId || ''] + '--cell' : ''
  ]
}

function talkName(category: string) {
  return category
}

function categoryClass(category: string) {
  const mapping: Record<string, string> = {
    // Legacy IDs (2025 and before)
    'clzyaamxk102o13hpbki089rf': 'design',
    'clzyaamxk102p13hpw8tzwls8': 'front',
    'clzyaamxk102q13hp7nja505n': 'backend',
    'clzyaamxk102r13hpan99q8vi': 'iot',
    'clzyaamxk102s13hpkwipk45v': 'architecture',
    'clzyaamxk102t13hp9akxg5en': 'tools',
    'clzyaamxk102u13hpzlab3f0w': 'human',
    'clzyaamxk102v13hplgi4r5fy': 'alien',
    // New text names (2026+)
    'Design, UI, UX': 'design',
    'Front web, design, UI, UX': 'front',
    'Backend, Cloud, Big Data': 'backend',
    'IOT, embarqué, mobile': 'iot',
    'Conception, architecture': 'architecture',
    'Outils, pratiques de dev': 'tools',
    'Humain & Tech': 'human',
    'Alien': 'alien',
    'Intelligence Artificielle': 'ia'
  }
  return mapping[category] || category
}

function roomName(room: number) {
  return rooms.value[room - 1]
}

function levelName(level: string) {
  switch (level) {
    case 'BEGINNER':
      return 'Débutant'
    case 'INTERMEDIATE':
      return 'Intermédiaire'
    case 'ADVANCED':
      return 'Confirmé'
    default:
      return level
  }
}

function duration(format: string) {
  const match = format?.match(/\((\d+min)\)/)
  return match ? match[1] : null
}

function formatName(format: string) {
  const match = format?.match(/^([^(]+)/)
  return match ? match[1].trim() : format
}

// OpenFeedback URL builder
const OPENFEEDBACK_EVENT_ID = 'nIlFquxGUZ1IJ1cDkc1z'
const DATE_BY_DAY: Record<number, string> = {
  1: '2026-02-12', // Jeudi
  2: '2026-02-13'  // Vendredi
}

function getOpenFeedbackUrl(talkId: string, talkDay: number) {
  const date = DATE_BY_DAY[talkDay] || DATE_BY_DAY[1]
  return `https://openfeedback.io/${OPENFEEDBACK_EVENT_ID}/${date}/${talkId}`
}
</script>

<template>
  <section id="schedule" class="container--white">
    <template v-if="!forApp">
      <div class="container--fix container--center">
        <h2>Le programme</h2>
        <!--        <h3>-->
        <!--          L'application du programme <a href="https://apps.apple.com/fr/app/touraine-tech-2022/id1599891078">Apple</a>-->
        <!--          <a href="https://play.google.com/store/apps/details?id=to.chapi.tnt">Android</a>-->
        <!--        </h3>-->
      </div>
      <br>
    </template>
    <div class="container-days">
      <div class="schedule-room--cell" :style="{'opacity' : day === 1 ? 1 : 0.5 }" @click="setDay(1)">
        Jeudi
      </div>
      <div class="schedule-room--cell" :style="{'opacity' : day === 2 ? 1 : 0.5 }" @click="setDay(2)">
        Vendredi
      </div>
    </div>
    <div class="schedule--grid">
      <div class="schedule-spacer--cell"></div>
      <div v-for="room of rooms" :key="room" class="schedule-room--cell">
        <h3>{{ room }}</h3>
      </div>
      <div v-for="time of times" :key="time.time" class="schedule-time--cell">
        {{ time.hiddenDays?.includes(day) ? '' : time.time }}
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
        :id="talk.id"
        :key="talk.id"
        :class="talkCssClass(talk)"
        :style="talkCellStyle(talk)"
        :data-time="talk.time"
      >
        <div v-if="talk.day === day">
          <NuxtLink
            :to="`/talk/${talk.id}?day=${day}`"
            :class="{ disabled: talk.id.includes('keynote')}"
          >
            <h4 class="schedule-title">
              {{ talk.title }}
            </h4>
            <h5 v-if="talk.speakerNames" class="schedule-speaker-name">
              {{ talk.speakerNames }}
            </h5>
          </NuxtLink>
          <ul class="schedule-talk-category">
            <li :class="['schedule-talk-'+categoryClass(talk.categories)+'--category']">
              {{ talkName(talk.categories) }}
            </li>
          </ul>
          <span class="schedule-talk-videoLinks" v-if="talk.peertubeLink || talk.dailymotionLink || talk.youtubeLink">
            <a v-if="talk.peertubeLink" :href="talk.peertubeLink" target="_blank"><img
              class="icon"
              src="/img/cinema.svg"
              alt="icon cinema"
            /></a>
            <a v-if="talk.dailymotionLink" :href="talk.dailymotionLink" target="_blank"><img
              class="icon"
              src="/img/dailymotion.svg"
              alt="icon dailymotion"
            /></a>
            <a v-if="talk.youtubeLink" :href="talk.youtubeLink" target="_blank"><img
              class="icon"
              src="/img/youtube.svg"
              alt="icon youtube"
            /></a>
          </span>
          <span class="schedule-talk-slidesLinks" v-if="talk.slidesLinks && talk.slidesLinks.length > 0">
            <p
              v-for="slidesLink of talk.slidesLinks"
              :key="slidesLink"
            >
              <a :href="slidesLink" target="_blank"><img
                class="icon" src="/img/presentation.svg"
                alt="icon presentation"
              />
              </a>
            </p>
          </span>
          <a
            v-if="talk.id !== 'keynoteCloture2' && !talk.id.includes('dummy')"
            :href="getOpenFeedbackUrl(talk.id, talk.day)"
            target="_blank"
            class="schedule-talk-feedback"
            title="Donner votre feedback"
          >
            <img class="icon" src="/img/feedback.svg" alt="Feedback" />
          </a>
          <div class="schedule-room--duration-level" v-if="talk.formats">
            <p>
              📋 {{ formatName(talk.formats) }} ({{ duration(talk.formats) }})
            </p>
            <p v-if="talk.level">
              🎯 {{ levelName(talk.level) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "./../assets/scss/variables" as *;

$color-iot: #5dbf48;
$color-human: #f3d800;
$color-architecture: #ed5940;
$color-tools: #ffa000;
$color-front: #0077c2;
$color-design: #ff75cc;
$color-backend: #345264;
$color-alien: #066420;
$color-ia: #9b59b6;

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
  grid-template-columns: 50px repeat(5, minmax(200px, 1fr));
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
      color: color.adjust(white, $lightness: -30%);
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
    color: color.adjust(white, $lightness: -10%);
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
    bottom: 3em;
    left: 5px;
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
      color.adjust($color-secondary, $lightness: 30%),
      color.adjust($color-secondary, $lightness: 30%) 10px,
      color.adjust($color-secondary, $lightness: 35%) 10px,
      color.adjust($color-secondary, $lightness: 35%) 20px
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

.schedule-talk-ia--cell {
  border-color: $color-ia;
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

.schedule-talk-alien--category {
  background-color: $color-alien;
}

.schedule-talk-ia--category {
  background-color: $color-ia;
}

.schedule-talk-conference--cell .schedule-title,
.schedule-talk-lightning--cell .schedule-title
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
.schedule-talk-time23--cell p.schedule-room--duration-level,
#keynoteCloture2 p.schedule-room--duration-level {
  display: none;
}

.disabled {
  color: lightgrey;
  pointer-events: none;
}

#dummy1 ul.schedule-talk-category,
#dummy2 ul.schedule-talk-category{
  visibility: hidden;
}

// Feedback link - positioned bottom right with teal glow on hover
.schedule-talk-feedback {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba($color-secondary, 0.15);
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  .icon {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1);
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: $color-secondary;
    box-shadow: 0 0 16px rgba($color-secondary, 0.6);
    transform: scale(1.1);

    .icon {
      transform: scale(1.1);
    }
  }
}
</style>
