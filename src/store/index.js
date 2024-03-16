import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phone: null,
    password:null
  },
  mutations: {
    savePhone(state, phone) {
      state.phone=phone
    },
    savePassword(state, password) {
      state.password=password
    }
  },
  actions: {
  },
  modules: {
  }
})