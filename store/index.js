import Vuex from 'vuex'
import SPONSORS from '../api/sponsors.json'
import TEAM from '../api/team.json'
import TALKS from '../api/talks.json'

const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

const createStore = () => {
  return new Vuex.Store({
    state: {
      sponsors: [],
      team: [],
      talks: [],
    },
    getters: {
      speakers ({talks}) {
        return flatMap(talk => talk.speakers, talks).sort((a,b) => a.name.localeCompare(b.name))
      }
    },
    actions: {
      async nuxtServerInit ({ commit }, { app }) {
        commit('SET_SPONSORS', SPONSORS)
        commit('SET_TEAM', TEAM.sort((a, b) => a.name.localeCompare(b.name)))
        commit('SET_TALKS', TALKS)
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
    }
  })
}

export default createStore
