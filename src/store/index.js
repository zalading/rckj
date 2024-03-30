import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from '@/store/modules/user'
// import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store= new Vuex.Store({
  state: {
    phone: null,
    companyName: null,
    token:''
  },
  mutations: {
    saveToken(state, token) {
      state.token=token
    },
    removeToken(state) {
      state.token=null
    },
    savePhone(state, phone) {
      state.phone=phone
    },
    removePhone(state) {
      state.phone=null
    },
    saveCompanyName(state, companyName) {
      state.companyName=companyName
    }
  },
  user,
  getters,
})
export default store