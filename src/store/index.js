import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import user from '@/store/modules/user'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    token: null,
    id:null,
    phone: null,
    companyName: null,
    keywordAll:null
  },
  mutations: {
    saveToken(state, token) {
      state.token=token
    },
    removeToken(state) {
      state.token=null
    },
    saveId(state, id) {
      state.id=id
    },
    removeId(state) {
      state.id=null
    },
    savePhone(state, phone) {
      state.phone=phone
    },
    removePhone(state) {
      state.phone=null
    },
    saveCompanyName(state, companyName) {
      state.companyName=companyName
    },
    removeCompanyName(state) {
      state.companyName=null
    },
    saveKeywordAll(state, keywordAll) {
      state.keywordAll=keywordAll
    },
    removeKeywordAll(state) {
      state.keywordAll=null
    }
  },
  // user,
  getters,
})
export default store