<template>
  <div class="specify-activitytype chart-simple">
    <div class="chart">
      <div class="chart-filter flex-wrap">
        <div class="time-range-wrap flex">
          <date-range-picker :time-range.sync="baseTime" :default-today="true" />
          <el-button class="getChartData" type="primary" size="small" @click="handleChartBtnClick">搜索</el-button>
        </div>
      </div>
      <div class="page-desc">{{ $route.meta.title }}：当前日期中，各活动的发布数量。</div>
      <el-radio-group
        v-model="chartRadio"
        class="radio-group"
        size="mini"
        @change="handleRadioChange"
      >
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="customize">自定义</el-radio-button>
      </el-radio-group>
      <chart v-if="Object.keys(chartData).length" ref="chart" v-loading="loadingMap.chartLoading" :chart-option="chartOptionWatcher" />
    </div>
    <div v-if="tableData.length" class="table-wrap">
      <div class="table-head flex">
        <div v-text="tableHead" />
        <div>
          <el-button type="primary" size="mini" @click="exportData">下载数据</el-button>
        </div>
      </div>
      <el-table
        :ref="refMap.table"
        v-loading="loadingMap.tableLoading"
        :data="tableData"
        :border="true"
        style="width: 100%"
        :header-cell-style="{textAlign:'center'}"
        :max-height="tableHeight"
        :tree-props="{children: 'children'}"
        row-key="id"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column sortable label="日期" prop="date" align="center" fixed />
        <el-table-column label="基础类型" prop="base" align="center" />
        <el-table-column label="总计" prop="baseValue" align="center" />
        <el-table-column label="自定义类型" prop="manual" align="center" />
        <el-table-column label="总计" prop="manualValue" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import specifyCommon from '../mixins/specifyCommon'
import pageConfig from './pageConfig'
export default {
  mixins: [specifyCommon],
  data() {
    return {
      ...pageConfig,
      chartRadio: 'all',
      customizeProp: [],
      tableHeight: 700
    }
  },
  methods: {
    parseChartData() {
      this.getAllKeys()
      this.customizeProp = []
      this.useProp.forEach(prop => this.baseType.some(type => prop === type) || this.customizeProp.push(prop))
      this.handleRadioChange()
      this.showChart = true
    },
    resetChart() {
      this.chartOption.option.xAxis = []
      this.chartOption.option.series = []

      const xAxis = this.$common.deepCopy(this.xAxisTpl)
      xAxis.data = this.chartData.map(chartItem => chartItem.date)
      this.chartOption.option.xAxis.push(xAxis)
    },
    allChart() {
      this.resetChart()
      this.useProp.forEach(prop => {
        const series = this.$common.deepCopy(this.seriesTpl)
        if (this.baseType.some(type => prop === type)) {
          series.name = prop
          series.data = this.chartData.map(item => item[prop])
        }
        this.chartOption.option.series.push(series)
      })
      if (this.customizeProp.length) {
        const series = this.$common.deepCopy(this.seriesTpl)
        series.name = '自定义'
        series.data = this.chartData.map(item => {
          let sum = 0
          this.customizeProp.forEach(prop => {
            sum += item[prop] || 0
          })
          return sum
        })
        this.chartOption.option.series.push(series)
      }
      this.chartOption.option.legend.data = [...this.useProp, '自定义']
    },
    customizeChart() {
      this.resetChart()
      this.customizeProp.forEach(prop => {
        const series = this.$common.deepCopy(this.seriesTpl)
        series.name = prop
        series.data = this.chartData.map(item => item[prop])
        this.chartOption.option.series.push(series)
      })
      this.chartOption.option.legend.data = this.customizeProp
    },
    parseTableData() {
      this.tableData = this.chartData.map((item, index) => {
        const itemData = {}
        itemData.date = item.date
        itemData.children = []
        itemData.id = `date-key-${index}`

        const baseData = []
        const manualData = []
        let baseTotal = 0
        let manualTotal = 0
        Object.entries(item).forEach(([key, value]) => {
          if (key !== 'date') {
            if (this.baseType.some(baseKey => baseKey === key)) {
              baseTotal += Number(value)
              baseData.push({ base: key, baseValue: value })
            } else {
              manualTotal += Number(value)
              manualData.push({ manual: key, manualValue: value })
            }
          }
        })
        itemData.base = '基础类型总计'
        itemData.baseValue = baseTotal
        itemData.manual = '自定义类型总计'
        itemData.manualValue = manualTotal
        baseData.forEach((base, baseIndex) => {
          const id = `date-key-${index}-base-${baseIndex}`
          itemData.children.push({ ...base, ...manualData.shift(), id })
        })
        manualData.forEach((manual, manualIndex) => {
          const id = `date-key-${index}-manual-${manualIndex}`
          itemData.children.push({ ...manual, id })
        })
        return itemData
      })
      this.tableHead = this.baseTime.map(item => this.$day(item).format('YYYY-MM-DD')).join(' — ')
    },
    handleRadioChange(value) {
      const status = this.chartRadio
      status === 'all' ? this.allChart() : this.customizeChart()
    },
    exportData() {
      const header = ['日期', '基础类型', '总计', '自定义类型', '总计']
      const filename = this.tableHead + this.chartTitle
      const data = this.tableData.map(temp => {
        const tempData = []
        tempData.push([temp.date, '', '', '', ''])
        temp.children.map(item => {
          const result = this.$common.deepCopy(item)
          delete result.id
          const { base, baseValue, manual, manualValue } = result
          tempData.push(['', base, baseValue, manual, manualValue])
        })
        return tempData
      }).flat(1)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header,
          data,
          filename,
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>
