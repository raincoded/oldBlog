import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    articleId: 0,
  },
  mutations: {
    changeStateId(state, payload) {
      state.articleId = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})

