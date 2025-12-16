import { defineStore } from 'pinia'
import SPONSORS from '~/api/sponsors.json'
import TEAM from '~/api/team.json'
import BREAKS from '~/api/config/breaks.json'
import CONFERENCE_HALL from '~/api/generated/conferenceHall.json'
import PLANNING from '~/api/generated/schedule.json'
import TIMES from '~/api/config/times.json'
import ROOMS from '~/api/config/rooms.json'
import PHOTOS from '~/api/photos_72177720323970146.json'
import DAYS from '~/api/config/days.json'
import CONFIGURATION from '~/assets/configuration'

interface Speaker {
  uid: string
  name: string
  bio?: string
  company?: string
  photoUrl?: string
  socials?: Array<{ type: string; url: string }>
}

interface Talk {
  id: string
  title: string
  abstract?: string
  speakers: string[]
  formats: string
  categories: string
  level?: string
  backup?: boolean
  rooms?: number[]
  times?: number[]
  day?: number
  youtubeLink?: string
}

interface Category {
  id: string
  name: string
}

interface Format {
  id: string
  name: string
}

interface Time {
  timeIndex: string
  time: string
  days: number[]
}

interface Break {
  id: string
  title: string
  rooms: number[]
  times: number[]
  day: number
}

interface Photo {
  original: string
  small: string
  date: string
}

interface Sponsor {
  id: string
  name: string
  type: string
  logo?: string
  url?: string
  description?: string
}

interface TeamMember {
  name: string
  avatar?: string
  socials?: Array<{ type: string; url: string }>
}

interface PlanningItem {
  id: string
  rooms: number[]
  times: number[]
  day: number
}

function addPlanningToTalks(talks: Talk[]): Talk[] {
  const planningByTalkId: Record<string, PlanningItem> = {}
  ;(PLANNING as PlanningItem[]).forEach((planning) => {
    planningByTalkId[planning.id] = planning
  })

  const dummies: Talk[] = [
    {
      id: 'dummy1',
      title: '',
      speakers: [],
      formats: '84638839-c9f7-5eaf-9df5-5fcb578c2c6d',
      categories: 'dbda76a4-7b09-5487-ad6b-6e67d86e9337',
      level: 'intermediate',
    },
    {
      id: 'dummy2',
      title: '',
      speakers: [],
      formats: '84638839-c9f7-5eaf-9df5-5fcb578c2c6d',
      categories: 'ed8afd05-a6aa-58e7-a6fd-7413d262a8b9',
      level: 'intermediate',
    },
  ]

  return [...talks, ...dummies]
    .filter((talk) => {
      const planning = planningByTalkId[talk.id]
      return planning && planning.rooms.length > 0 && planning.times.length > 0 && planning.day
    })
    .map((talk) => {
      const planning = planningByTalkId[talk.id]
      return {
        ...talk,
        rooms: planning.rooms,
        times: planning.times,
        day: planning.day,
      }
    })
}

export const useMainStore = defineStore('main', {
  state: () => ({
    sponsors: SPONSORS as Sponsor[],
    team: (TEAM as TeamMember[]).sort((a, b) => a.name.localeCompare(b.name)),
    talks: addPlanningToTalks(CONFERENCE_HALL.talks as Talk[]),
    breaks: BREAKS as Break[],
    speakers: CONFERENCE_HALL.speakers as Speaker[],
    categories: CONFERENCE_HALL.categories as Category[],
    formats: CONFERENCE_HALL.formats as Format[],
    times: TIMES as Time[],
    rooms: ROOMS as string[],
    days: DAYS as number[],
    photos: (PHOTOS as Photo[]).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    ),
    configuration: CONFIGURATION,
  }),

  getters: {
    getSpeakerForIds: (state) => {
      return (ids: string[]) => state.speakers.filter(({ uid }) => ids.includes(uid))
    },
  },
})
