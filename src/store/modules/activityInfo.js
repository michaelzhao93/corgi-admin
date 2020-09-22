import { queryActivity, queryUser } from '@/api/contentMgr'
import { Message } from 'element-ui'

const state = {
  show: false,
  activityId: '',
  activityInfo: {},
  activityUserInfo: {}
}

const mutations = {
  SET_SHOW: (state, value) => {
    state.show = value
  },
  SET_ACTIVITY_ID: (state, value) => {
    state.activityId = value
  },
  SET_ACTIVITY_INFO: (state, value) => {
    state.activityInfo = value
  },
  SET_ACTIVITY_USERINFO: (state, value) => {
    state.activityUserInfo = value
  }
}

const actions = {
  async getActivityInfo({ commit, dispatch }) {
    try {
      const parmas = {
        id: state.activityId,
        page: 1,
        pageSize: 10
      }
      const data = await queryActivity(parmas)
      if (Array.isArray(data.data) && data.data.length) {
        commit('SET_ACTIVITY_INFO', data.data[0])
        dispatch('getUserInfo')
      } else {
        Message({ type: 'warning', message: '没有找到匹配活动' })
        commit('SET_ACTIVITY_INFO', {})
      }
    } catch (err) {
      console.log(err)
    }
  },
  async getUserInfo({ commit }) {
    try {
      const parmas = {
        userId: state.activityInfo.userId,
        page: 1,
        pageSize: 10
      }
      const data = await queryUser(parmas)
      if (Array.isArray(data.data) && data.data.length) {
        commit('SET_ACTIVITY_USERINFO', data.data[0])
      } else {
        Message({ type: 'warning', message: '没有找到匹配用户' })
        commit('SET_ACTIVITY_USERINFO', {})
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

