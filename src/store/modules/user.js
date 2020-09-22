import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const validUsername = 'corgi'
    const validPassword = 'temp!@#$1234'
    return new Promise(async(resolve, reject) => {
      try {
        // 登录验证暂时由前端控制，到时候用注释的部分就可以

        // const result = await login({ username: username.trim(), password })
        if (username === validUsername && password === validPassword) {
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        } else {
          throw new Error('输入信息有误')
        }
      } catch (error) {
        reject(error)
      }
      // }).catch(error => {
    // })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise(async(resolve, reject) => {
      try {
        // const result = await getInfo(state.token)

        // if (!data) {
        //   reject('身份认证失败，请重新登录。')
        // }

        const name = 'corgi'
        commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise(async(resolve, reject) => {
      try {
        // await logout()
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

