<template>
  <div class="dataCenter-dau chart-simple">
    <!-- <btn-group @emitFunc="acceptEmitFunc" /> -->
    <div class="chart">
      <div class="chart-filter flex-wrap">
        <div class="time-range-wrap flex">
          <date-range-picker :time-range.sync="baseTimeRange" />
          <el-button class="getChartData" type="primary" size="small" @click="handleChartBtnClick">搜索</el-button>
        </div>
        <div>
          <el-checkbox v-model="MOM">环比</el-checkbox>
          <el-checkbox v-model="YOY">同比</el-checkbox>
        </div>
      </div>
      <chart v-if="Object.keys(chartData).length" ref="chart" :chart-option="chartOptionWatcher" />
    </div>
    <div v-if="tableData.length" class="table-wrap">
      <div class="table-head flex">
        <div v-text="tableHead" />
        <div>
          <el-button type="primary" size="mini" @click="exportData">下载数据</el-button>
        </div>
      </div>
      <div class="tabel-height-400">
        <vue-scroll>
          <el-table
            :ref="refMap.table"
            v-loading="loadingMap.tableLoading"
            :data="tableData"
            :border="true"
            style="width: 100%"
            :header-cell-style="{textAlign:'center'}"
            row-key="index"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column sortable label="日期" align="center" prop="date" />
            <el-table-column sortable label="DAU" align="center" prop="dau" />
            <el-table-column v-if="tableMOM" sortable label="MOM" align="center" prop="MOM" />
            <el-table-column v-if="tableYOY" sortable label="YOY" align="center" prop="YOY" />
          </el-table>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import '../style/index.scss'
import { getStatistics } from '@/api/dataCenter'
import dateRangePicker from '../components/dateRangePicker'
import Chart from '@/components/Chart'
import { emit } from '@/mixins/commonSet'
import tableCommon from '@/mixins/tableCommon'
import pageConfig from './pageConfig'
export default {
  components: { dateRangePicker, Chart },
  mixins: [emit, tableCommon, pageConfig],
  data() {
    return {
      loadingMap: {
        statsLoading: true
      },
      contrast: false,
      extraHeight: 350
    }
  },
  computed: {
    chartOptionWatcher() {
      return this.chartOption
    },
    isTimeRangeSelected() {
      return this.baseTimeRange.length >= 2
    }
  },
  watch: {
  },
  mounted() {
    this.addTabelHeightListener('parent')
  },
  methods: {
    async getData() {
      try {
        const task = []
        this.isTimeRangeSelected && task.push(this.handleChartBtnClick())
        await Promise.all(task)
      } catch (err) {
        console.log(err)
      }
    },
    async handleChartBtnClick() {
      if (this.isTimeRangeSelected) {
        try {
          const task = []
          const baseSearchTime = this.baseTimeRange.map(date => this.$day(date).format('YYYY-MM-DD'))
          task.push(this.getChartData('dau', baseSearchTime))
          if (this.MOM) {
            const searchTime = this.baseTimeRange.map(date => this.$day(date).subtract(1, 'month').format('YYYY-MM-DD'))
            task.push(this.getChartData('MOM', searchTime))
          }
          if (this.YOY) {
            const searchTime = this.baseTimeRange.map(date => this.$day(date).subtract(1, 'year').format('YYYY-MM-DD'))
            task.push(this.getChartData('YOY', searchTime))
          }
          await Promise.all(task)
          this.parseChartData()
          this.parseTableData()
        } catch (err) {
          console.log(err)
        }
      }
    },
    async getChartData(dataType, dateArr) {
      const type = this.chartType
      const [startDate, endDate] = dateArr
      const result = await getStatistics({ type, startDate, endDate })
      const check = result.hasOwnProperty('data') && Array.isArray(result.data) ? result.data : []
      this.chartData[dataType] = check.reduce((data, item) => {
        data[item.date] = item
        return data
      }, {})
    },
    parseChartData() {
      this.chartOption.option.xAxis = []
      this.chartOption.option.series = []
      this.chartOption.option.dataZoom[0].xAxisIndex = []
      Object.entries(this.chartData).forEach((dataItem, index) => {
        const xAxis = this.$common.deepCopy(this.xAxisTpl)
        const series = this.$common.deepCopy(this.seriesTpl)
        const [key, value] = dataItem
        Object.values(value).forEach((item, itemIndex) => {
          if (key === 'dau') {
            xAxis.data.push(item.date)
            series.data.push(item.count)
          } else {
            let targetDate
            if (key === 'MOM') {
              targetDate = this.$day(item.date).add(1, 'month').format('YYYY-MM-DD')
            } else if (key === 'YOY') {
              targetDate = this.$day(item.date).add(1, 'year').format('YYYY-MM-DD')
            }
            const matchData = this.chartData.dau[targetDate]
            const base = (matchData && matchData.hasOwnProperty('count')) ? item.count - matchData.count : '--'
            let ratio
            if (base === '--') {
              ratio = '--'
            } else {
              const before = item.count
              if (before === 0) {
                if (base === 0) {
                  ratio = '0%'
                } else {
                  ratio = (before + 1) * base * 100 + '%'
                }
              } else {
                if (base === 0) {
                  ratio = (before - 1) * base * 100 + '%'
                } else {
                  ratio = (base / before).toFixed(2) * 100 + '%'
                }
              }
            }
            series.data.push(ratio)
          }
        })
        series.name = this.allChartType.find(item => key === item.label).text
        this.chartOption.option.xAxis.push(xAxis)
        this.chartOption.option.series.push(series)
        this.chartOption.option.dataZoom[0].xAxisIndex.push(index)
      })
      this.showChart = true
    },
    parseTableData() {
      this.loadingMap.tableLoading = true
      this.tableData = []
      const propName = Object.keys(this.chartData)
      const baseProp = propName[0]
      const baseData = Object.values(this.chartData[baseProp])
      baseData.forEach((item, index) => {
        const temp = {}
        temp.date = item.date
        propName.forEach((prop, itemIndex) => {
          if (prop === 'dau') {
            temp.dau = item.count
          } else {
            let targetDate
            if (prop === 'MOM') {
              targetDate = this.$day(temp.date).subtract(1, 'month').format('YYYY-MM-DD')
            } else if (prop === 'YOY') {
              targetDate = this.$day(temp.date).subtract(1, 'year').format('YYYY-MM-DD')
            }
            const matchData = this.chartData[prop][targetDate]
            temp[prop] = matchData && matchData.hasOwnProperty('count') ? matchData.count : '--'
          }
        })
        this.tableData.push(temp)
      })
      this.tableMOM = this.chartData.hasOwnProperty('MOM')
      this.tableYOY = this.chartData.hasOwnProperty('YOY')
      this.tableSortable = true
      this.dateAlign = 'center'
      this.tableHead = this.baseTimeRange.map(date => this.$day(date).format('YYYY-MM-DD')).join(' 至 ')
      this.loadingMap.tableLoading = false
    },
    exportData() {
      const header = ['日期', 'DAU']
      this.tableMOM && header.push('环比')
      this.tableYOY && header.push('同比')
      const filename = 'DAU统计表'
      const data = this.tableData.map(item => Object.values(item))
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header,
          data,
          filename,
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    isContrast() {
      this.contrast = !this.contrast
    }
  }
}
</script>
