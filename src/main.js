import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import 'viewerjs/dist/viewer.css'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission'
import elResizeDect from 'element-resize-detector'
import vueLazy from 'vue-lazyload'
import Viewer from 'v-viewer'
import dayjs from 'dayjs'
import vuescroll from 'vuescroll/dist/vuescroll-native'

import commonFunction from '@/utils/commonFunction'
commonFunction.install(Vue)

import element from '@/utils/element'
element.install(Vue)

import echarts from '@/utils/echarts'
echarts.install(Vue)

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
Vue.use(vueLazy, {
  error: 'https://www.corgi.org.cn/images/error.jpg',
  loading: 'https://www.corgi.org.cn/images/loading.gif'
})
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#c1c1c1',
      onlyShowBarOnScroll: false,
      showDelay: 5000
    }
  }
})

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.prototype.$erd = elResizeDect()
Vue.prototype.$day = dayjs

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
