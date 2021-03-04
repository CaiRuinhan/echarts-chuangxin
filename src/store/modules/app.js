const state = {
  flag: true

}

const mutations = {
  TOGGLE_FLAG: (state, flag) => {
    state.flag = flag
  }

}

const actions = {
  toggleFlag ({ commit }, flag) {
    commit('TOGGLE_FLAG', flag)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
