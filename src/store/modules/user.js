const state = {
  token: null,
  phone: null,
  companyName:null
}

const mutations = {
  updateToken(state, token) {
    state.token=token
  },
  removeToken(state) {
    state.token=null
  },
  // savePhone(state, phone) {
  //   state.phone=phone
  // },
  // removePhone(state) {
  //   state.phone=null
  // },
  // saveCompanyName(state, companyName) {
  //   state.companyName=companyName
  // },
  // removeCompany(state) {
  //   state.companyName=null
  // }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}