import Vuex from 'vuex'
import SPONSORS from '../api/sponsors.json'
import TEAM from '../api/team.json'
import BREAKS from '../api/breaks.json'

import {speakers as SPEAKERS, talks as TALKS, categories, formats} from "../api/conferenceHall";
import PLANNING from '../api/planning';
import TIMES from '../api/times';
import ROOMS from '../api/rooms';
import PHOTOS from '../api/photos_72177720315139801.json';
import DAYS from '../api/days.json';
import CONFIGURATION from '../assets/configuration'


const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], []);

function addPlanningToTalks(TALKS) {
  const planningByTalkId = {};
  PLANNING.forEach(planning => planningByTalkId[planning.id] = planning);

  const dummies = [    {
    "id": "dummy1",
    "title": "",
    "state": "confirmed",
    "level": "intermediate",
    "categories": "dbda76a4-7b09-5487-ad6b-6e67d86e9337",
    "formats": "84638839-c9f7-5eaf-9df5-5fcb578c2c6d",
    "speakers": [],
    "language": "French"
  },
    {
      "id": "dummy2",
      "title": "",
      "state": "confirmed",
      "level": "intermediate",
      "formats": "84638839-c9f7-5eaf-9df5-5fcb578c2c6d",
      "categories": "ed8afd05-a6aa-58e7-a6fd-7413d262a8b9",
      "speakers": [],
      "language": "French"
    },]

  return [...TALKS, ...dummies].filter(talk => {
    return planningByTalkId[talk.id] && planningByTalkId[talk.id].rooms.length > 0 && planningByTalkId[talk.id].times.length > 0 && planningByTalkId[talk.id].day
  }).map(talk => {
    talk.rooms = planningByTalkId[talk.id].rooms;
    talk.times = planningByTalkId[talk.id].times;
    talk.day = planningByTalkId[talk.id].day;
    return talk
  });
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      sponsors: [],
      team: [],
      talks: [],
      speakers:[],
      breaks: [],
      categories: [],
      formats: [],
      times: [],
      rooms: [],
      days: [],
      photos: [],
      configuration: {},
    },
    getters: {
      speakers ({speakers}) {
        return speakers.map(s => {
          s.photoURL=`@/assets/img/speakers/${s.uid}.png`;
          return s;
        })
      },
      getSpeakerForIds({speakers}) {
        return ids => speakers.filter(({uid}) => ids.includes(uid))
      },
      talks ({talks}) {
        return talks
      },
      breaks ({breaks}) {
        return breaks;
      },
      categories ({categories}) {
        return categories;
      },
      formats ({formats}) {
        return formats
      },
      times ({times}) {
        return times
      },
      rooms ({rooms}) {
        return rooms
      },
      days ({days}) {
        return days
      },
      photos ({photos}) {
        return photos
      },
      configuration ({configuration}) {
        return configuration
      }
    },
    actions: {
      async nuxtServerInit ({ commit }, { app }) {
        commit('SET_SPONSORS', SPONSORS);
        commit('SET_TEAM', TEAM.sort((a, b) => a.name.localeCompare(b.name)));
        commit('SET_TALKS', addPlanningToTalks(TALKS));
        commit('SET_BREAKS', BREAKS);
        commit('SET_SPEAKERS', SPEAKERS.sort((a, b) => a.uid.localeCompare(b.uid)));
        commit('SET_CATEGORIES', categories);
        commit('SET_FORMATS', formats);
        commit('SET_TIMES', TIMES);
        commit('SET_ROOMS', ROOMS);
        commit('SET_PHOTOS', PHOTOS);
        commit('SET_DAYS', DAYS);
        commit('SET_CONFIGURATION', CONFIGURATION);
      }
    },
    mutations: {
      SET_SPONSORS (state, sponsors) {
        state.sponsors = sponsors
      },
      SET_TEAM (state, team) {
        state.team = team
      },
      SET_TALKS (state, talks) {
        state.talks = talks
      },
      SET_SPEAKERS (state, speakers) {
        state.speakers = speakers
      },
      SET_BREAKS (state, breaks) {
        state.breaks = breaks
      },
      SET_CATEGORIES (state, categories) {
        state.categories = categories
      },
      SET_FORMATS (state, formats) {
        state.formats = formats
      },
      SET_TIMES (state, times) {
        state.times = times
      },
      SET_ROOMS (state, rooms) {
        state.rooms = rooms
      },
      SET_PHOTOS (state, photos) {
        state.photos = photos.sort((a,b) => new Date(a.date) - new Date(b.date));
      },
      SET_DAYS (state, days) {
        state.days = days;
      },
      SET_CONFIGURATION (state, configuration) {
        state.configuration = configuration;
      }
    }
  })
}

export default createStore
