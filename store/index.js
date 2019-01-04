import Vuex from 'vuex'
import SPONSORS from '../api/sponsors.json'
import TEAM from '../api/team.json'
import TALKS from '../api/talks.json'
import SPEAKERS from '../api/speakers.json'

const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

const createStore = () => {
  return new Vuex.Store({
    state: {
      sponsors: [],
      team: [],
      talks: [],
      speakers: []
    },
    getters: {
      speakers ({speakers}) {
        return speakers
      },
      talks ({talks}) {
        return talks
      }
    },
    actions: {
      async nuxtServerInit ({ commit }, { app }) {
        commit('SET_SPONSORS', SPONSORS)
        commit('SET_TEAM', TEAM.sort((a, b) => a.name.localeCompare(b.name)))
        commit('SET_TALKS', TALKS.filter(({backup}) => !backup))
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
    }
  })
}

export default createStore
