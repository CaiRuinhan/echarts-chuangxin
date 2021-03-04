import { getInfo, logout } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    if (token) setToken(token)
  }
}

const actions = {
  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          let err = '获取用户信息失败，请重新登录后再试'
          reject(err)
        }

        const { trueName } = data
        commit('SET_TRUENAME', trueName)

        const { orgEntity } = data
        commit('SET_ORGNAME', orgEntity.fullOrgName)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
