import { getCountTask, countCheckPic, countReport, count_check_sound } from '@/api/contentMgr'

// 设置循环定时器，执行获取计数的方法
async function setMethodTimer(method, faildCount = 0) {
  let timeout = 3000
  try {
    await method()
    faildCount = 0
  } catch (err) {
    console.error(err)
    if (++faildCount >= 3) {
      faildCount = 0
      timeout = 1000 * 60 * 5
    }
  } finally {
    setTimeout(() => setMethodTimer(method, faildCount), timeout)
  }
}

// 获取计数方法，要求方法名和Router中,meta下的badge值一致
const methodsMap = {
  async user() {
    const params = { type: 'user' }
    const result = await getCountTask(params)
    if (result && result.hasOwnProperty('data')) {
      state.valuesMap.user = result.data
    }
  },
  async activity() {
    const params = { type: 'activity' }
    const result = await getCountTask(params)
    if (result && result.hasOwnProperty('data')) {
      state.valuesMap.activity = result.data
    }
  },
  async avatorCensor() {
    const params = {
      type: 'avatar',
      status: 'check'
    }
    const result = await countCheckPic(params)
    if (result && result.hasOwnProperty('data')) {
      state.valuesMap.avatorCensor = result.data
    }
  },
  async activityImageCensor() {
    const params = {
      type: 'activity',
      status: 'check'
    }
    const result = await countCheckPic(params)
    if (result && result.hasOwnProperty('data')) {
      state.valuesMap.activityImageCensor = result.data
    }
  },

  async speechCensor() {
    const params = {
      type: 'user',
      status: 'check'
    }
    const result = await count_check_sound(params)
    if (result && result.hasOwnProperty('data')) {
      state.valuesMap.speechCensor = result.data
    }
  },
  async userImgCensor() {
    const params = {
      type: 'user',
      status: 'check'
    }
    const result = await countCheckPic(params)
    if (result && result.hasOwnProperty('data')) {
      state.valuesMap.userImgCensor = result.data
    }
  },
  async report() {
    const params = {
      reportStatus: 'reported'
    }
    const result = await countReport(params)
    if (result && result.hasOwnProperty('data')) {
      state.valuesMap.report = result.data
    }
  }
}

// 一级菜单与二级菜单关联关系
const dotMap = {
  contentMgr: ['user', 'activity', 'avatorCensor', 'activityImageCensor', 'userImgCensor','speechCensor','report']
}

// 所有计数值保管对象
let valuesMap = Object.keys(methodsMap).reduce((map, key) => {
  Reflect.set(map, key, 0)
  return map
}, {})

// 所有红点标记状态保管对象
const dotStatus = Object.keys(dotMap).reduce((map, key) => {
  Reflect.set(map, key, 0)
  return map
}, {})

// 设置代理，设置新值时动态修改dotStatus中对应dot的状态
valuesMap = new Proxy(valuesMap, {
  set: (target, key, value) => {
    Reflect.set(target, key, value)
    const dot = Object.entries(dotMap).find(([dot, badgeKeys]) => badgeKeys.some(badge => badge === key))
    if (dot) {
      const [dotKey, badgeKeys] = dot
      dotStatus[dotKey] = badgeKeys.some(badge => state.valuesMap[badge])
    }
    return true
  }
})

const state = {
  valuesMap,
  dotStatus
}

const mutations = {
  // 激活对应计数方法的定时器
  ADD_ACTIVE_BADGE(state, name) {
    const method = methodsMap[name]
    method && setMethodTimer(method)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

