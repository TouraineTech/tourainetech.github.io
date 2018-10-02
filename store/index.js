import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      sponsors: [],
      photos: [],
    },
    actions: {
      async nuxtServerInit ({ commit }, { app }) {
        commit('SET_SPONSORS', [
          {
            name: "Code-Troopers",
            image: "",
            link: "https://code-troopers.com",
            type: "bronze",
            desc: "Superrrr"
          },
          {
            name: "Harmonie",
            image: "",
            link: "https://harmonie-mutuelle.com",
            type: "platinium",
            desc: "Harmmonieeee"
          }
        ])
      }
    },
    mutations: {
      SET_SPONSORS (state, sponsors) {
        console.log(state)
        state.sponsors = sponsors
      }
    }
  })
}

export default createStore
