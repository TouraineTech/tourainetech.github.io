import Vuex from 'vuex'
import SPONSORS from '../api/sponsors.json'

const createStore = () => {
  return new Vuex.Store({
    state: {
      sponsors: [],
      photos: [],
    },
    actions: {
      async nuxtServerInit ({ commit }, { app }) {
        commit('SET_SPONSORS', SPONSORS)
      }
    },
    mutations: {
      SET_SPONSORS (state, sponsors) {
        state.sponsors = sponsors
      }
    }
  })
}

export default createStore
