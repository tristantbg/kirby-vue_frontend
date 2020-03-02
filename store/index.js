import Vuex from 'vuex'

const auth = {
  username: process.env.API_USERNAME,
  password: process.env.API_PASSWORD,
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      home: [],
      information: [],
      projects: [],
      meta: [],
    },
    actions: {
      // Get Index Files
      async getInfo ({ commit }) {
        const info = await this.$axios.$get('/site', {auth})
        const about = await this.$axios.$get('/pages/information', {auth, params: { select: 'content'}})
        commit('setMeta', info)
        await commit('setInfo', about)
      },

      async getHome ({ commit }) {
        const home = await this.$axios.$get('/pages/home', {auth, params: { select: 'content'}})
        commit('setHome', home)
      },

      async getProjects ({ commit, dispatch }) {
        const projects = await this.$axios.$get('/pages/projects/children', {auth, params: { select: 'content, id, slug'}})
        commit('setProjects', projects)
      },

      //Nuxt Server Init
      async nuxtServerInit ({ commit, dispatch }) {
        await dispatch ('getInfo')
        await dispatch ('getProjects')
        await dispatch ('getHome')
      }
    },
    mutations: {
      // Site
      setMeta: (state, info) => {
        state.meta = info.data.content
      },
      // Home
      setHome: (state, home) => {
        state.home = home.data.content
      },
      // About
      setInfo: (state, info) => {
        state.information = info.data.content
      },
      // Projects
      setProjects: (state, payload) => {
        state.projects = payload.data
      }
    }
  })
}

export default createStore
