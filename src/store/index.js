import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import userInfo from './modules/userInfo'
import activityInfo from './modules/activityInfo'
import slideBadge from './modules/slideBadge'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    userInfo,
    activityInfo,
    slideBadge
  },
  getters
})

export default store
