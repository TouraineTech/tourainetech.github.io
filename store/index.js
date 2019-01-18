import Vuex from 'vuex'
import SPONSORS from '../api/sponsors.json'
import TEAM from '../api/team.json'
import TALKS from '../api/talks.json'
import SPEAKERS from '../api/speakers.json'
import BREAKS from '../api/breaks.json'

const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

const createStore = () => {
  return new Vuex.Store({
    state: {
      sponsors: [],
      team: [],
      talks: [],
      speakers: [],
      breaks: []
    },
    getters: {
      speakers ({speakers}) {
        return speakers
      },
      getSpeakerForIds({speakers}) {
        return ids => speakers.filter(({id}) => ids.includes(id))
      },
      talks ({talks}) {
        return talks
      },
      breaks ({breaks}) {
        return breaks;
      }
    },
    actions: {
      async nuxtServerInit ({ commit }, { app }) {
        commit('SET_SPONSORS', SPONSORS)
        commit('SET_TEAM', TEAM.sort((a, b) => a.name.localeCompare(b.name)))
        commit('SET_TALKS', TALKS.filter(({backup}) => !backup)),
        commit('SET_BREAKS', BREAKS),
        commit('SET_SPEAKERS', SPEAKERS.filter(({confirmed}) => confirmed).sort((a, b) => a.name.localeCompare(b.name)))
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
      }
    }
  })
}

export default createStore
