import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { isObject } from 'util'
import Qs from 'qs'

// const ALLOWPARAMS = ['nickname', 'desc', 'title', 'content']
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000,
  transformRequest: [
    function(data = {}) {
      Object.keys(data).forEach(element => {
        if (isObject(data[element])) {
          data[element] = JSON.stringify(data[element])
        }
      })
      return Qs.stringify(data)
    }
  ]
  // paramsSerializer: function(params) {
  //   const filter = Object.entries(params).reduce((result, item) => {
  //     const [key, value] = item
  //     const isValid = value || ALLOWPARAMS.some(prop => prop === key)
  //     if (isValid) {
  //       result[key] = value
  //     }
  //     return result
  //   }, {})
  //   return Qs.stringify(filter)
  // }
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // let each request carry token
      // please modify it according to the actual situation
      config.headers['jwt'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  async response => {
    const res = response.data
    try {
      if (res.code !== 0) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000,
          showClose: true
        })

        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          await MessageBox.confirm('您已被登出，是否重新登录', '登出警告', {
            confirmButtonText: '重登',
            cancelButtonText: '取消',
            type: 'warning',
            showClose: true
          })
          store.dispatch('user/resetToken').then(() => location.reload())
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    } catch (err) {
      console.error(err)
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
