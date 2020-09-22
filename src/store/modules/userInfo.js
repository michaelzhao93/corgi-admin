import { queryUser } from '@/api/contentMgr'
import { Message } from 'element-ui'

const state = {
  show: false,
  userId: '',
  userInfo: {}
}

const mutations = {
  SET_SHOW: (state, value) => {
    state.show = value
  },
  SET_USER_ID: (state, value) => {
    state.userId = value
  },
  SET_USERINFO: (state, value) => {
    state.userInfo = value
  }
}

const actions = {
  async getUserInfo({ commit }) {
    try {
      const parmas = {
        // userId: state.userId,
        userId: state.userId,
        page: 1,
        pageSize: 10
      }
      const data = await queryUser(parmas)
      if (Array.isArray(data.data) && data.data.length) {
        commit('SET_USERINFO', data.data[0])
      } else {
        commit('SET_USERINFO', {})
        Message({ type: 'warning', message: '没有找到匹配用户' })
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

