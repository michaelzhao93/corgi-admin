var echarts = require('echarts/lib/echarts')
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/dataZoomInside')
require('echarts/lib/component/dataZoomSlider')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$chart', {
      value: echarts
    })
  }
}
