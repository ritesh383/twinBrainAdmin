import Vue from 'vue'
import Vuex from 'vuex'
import allpage from './allPages'
import contents from './Contents'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    allpage,
    contents
  }
})
