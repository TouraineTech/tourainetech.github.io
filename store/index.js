import Vuex from 'vuex'
import SPONSORS from '../api/sponsors.json'
import TEAM from '../api/team.json'
import BREAKS from '../api/breaks.json'

import {speakers as SPEAKERS, talks as TALKS, categories, formats} from "../api/conferenceHall";
import PLANNING from '../api/planning';

const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], []);

function addPlanningToTalks(TALKS) {
  const planningByTalkId = {};
  PLANNING.forEach(planning => planningByTalkId[planning.id] = planning);

  return TALKS.map(talk => {
    talk.rooms = planningByTalkId[talk.id].rooms;
    talk.times = planningByTalkId[talk.id].times;
    return talk
  });
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      sponsors: [],
      team: [],
      talks: [],
      speakers: [],
      breaks: [],
      categories: [],
      formats: []
    },
    getters: {
      speakers ({speakers}) {
        return speakers
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
      }
    },
    actions: {
      async nuxtServerInit ({ commit }, { app }) {
        commit('SET_SPONSORS', SPONSORS),
        commit('SET_TEAM', TEAM.sort((a, b) => a.name.localeCompare(b.name))),
        commit('SET_TALKS', addPlanningToTalks(TALKS)),
        commit('SET_BREAKS', BREAKS),
        commit('SET_SPEAKERS', SPEAKERS.sort((a, b) => a.displayName.localeCompare(b.displayName))),
        commit('SET_CATEGORIES', categories),
        commit('SET_FORMATS', formats)
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
      }
    }
  })
}

export default createStore
