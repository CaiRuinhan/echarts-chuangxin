const state = {
  name: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
    console.log('name', name)
  }
}

export default {
  namespaced: true,
  state,
  mutations

}
