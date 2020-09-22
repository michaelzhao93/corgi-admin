<template>
  <div class="dataCenter-overview">
    <statistics />
    <div class="chart-type">
      <el-radio-group v-model="chartType" size="small">
        <el-radio-button
          v-for="radio of allChartType"
          :key="`chart_radio_${radio.label}`"
          :label="radio.label"
        >{{ radio.text }}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="chart">
      <div class="chart-filter flex-wrap">
        <div class="time-range-wrap flex">
          <date-range-picker :time-range.sync="timeRangeFirst" />
          <transition name="fade">
            <div v-show="contrast">
              <span class="break" v-text="'对比'" />
              <date-range-picker :time-range.sync="timeRangeSecond" />
            </div>
          </transition>
          <el-button class="getChartData" type="primary" size="small" @click="handleChartBtnClick">搜索</el-button>
        </div>
        <div>
          <el-button size="small" @click="isContrast">{{ contrast ? '取消对比' : '按时间对比' }}</el-button>
        </div>
      </div>
      <chart v-if="showChart" ref="chart" :chart-option="chartOptionWatcher" />
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
            default-expand-all
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column :sortable="tableSortable" label="日期" prop="date" :align="dateAlign" />
            <el-table-column :sortable="tableSortable" label="新增注册人数" align="center" prop="register" />
            <el-table-column :sortable="tableSortable" label="发布活动数" align="center" prop="activity" />
          </el-table>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { getStatistics } from '@/api/dataCenter'
import statistics from '../components/statistics'
import dateRangePicker from '../components/dateRangePicker'
import Chart from '@/components/Chart'
import { emit } from '@/mixins/commonSet'
import tableCommon from '@/mixins/tableCommon'
import pageConfig from './pageConfig'
export default {
  components: { statistics, dateRangePicker, Chart },
  mixins: [emit, tableCommon, pageConfig],
  data() {
    return {
      loadingMap: {
        statsLoading: true
      },
      refs: {
        sysBtn: 'sysTypeBtn'
      },
      contrast: false,
      extraHeight: 350,
      contrastProp: ['base', 'contrast']
    }
  },
  computed: {
    chartTitle() {
      const type = this.chartType
      const match = this.allChartType.find(item => item.label === type)
      return match && match.text || '未知标题'
    },
    chartOptionWatcher() {
      const option = this.chartOption
      option.option.title.text = this.chartTitle
      return option
    },
    isTimeRangeSelected() {
      if (this.contrast) {
        return (this.timeRangeFirst.length >= 2 && this.timeRangeSecond.length >= 2)
      } else {
        return this.timeRangeFirst.length >= 2
      }
    },
    isTimeRangeValid() {
      if (this.isTimeRangeSelected) {
        if (this.contrast) {
          const [firstStart, firstEnd] = this.timeRangeFirst.map(item => this.$day(item))
          const [secondStart, secondEnd] = this.timeRangeSecond.map(item => this.$day(item))
          const firstDiff = firstStart.diff(firstEnd, 'day')
          const secondDiff = secondStart.diff(secondEnd, 'day')
          if (firstDiff !== secondDiff) {
            this.$message({ type: 'warning', message: '对比天数必须一致' })
            return false
          }
        }
        return true
      } else {
        this.$message({ type: 'warning', message: '请选择时间' })
        return false
      }
    }
  },
  watch: {
    chartTitle() {
      this.isTimeRangeSelected && this.parseChartData()
    }
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
        console.error(err)
      }
    },
    async handleChartBtnClick() {
      if (this.isTimeRangeValid) {
        try {
          const task = []
          this.allChartType.forEach(chartType => {
            const type = chartType.label
            task.push(this.wrapGetChartData(type))
          })
          await Promise.all(task)
          this.parseChartData()
          this.parseTableData()
        } catch (err) {
          console.error(err)
        }
      }
    },
    async wrapGetChartData(type) {
      const task = []
      task.push(this.getChartData(type, this.timeRangeFirst))
      this.contrast && task.push(this.getChartData(type, this.timeRangeSecond))
      this.chartData[type] = await Promise.all(task)
    },
    async getChartData(type, dateArr) {
      const [startDate, endDate] = dateArr.map(item => this.$day(item).format('YYYY-MM-DD'))
      const result = await getStatistics({ type, startDate, endDate })
      return result.hasOwnProperty('data') && Array.isArray(result.data) ? result.data : []
    },
    parseChartData() {
      this.chartOption.option.xAxis = []
      this.chartOption.option.series = []
      this.chartOption.option.dataZoom[0].xAxisIndex = []

      const matchData = this.chartData[this.chartType]
      Array.isArray(matchData) && matchData.forEach((item, index) => {
        const xAxis = this.$common.deepCopy(this.xAxisTpl)
        const series = this.$common.deepCopy(this.seriesTpl)

        item.forEach((dataItem) => {
          xAxis.data.push(dataItem.date)
          series.data.push(dataItem.count)
        })

        series.name = index === 0 ? '基准' : '对比'
        this.chartOption.option.xAxis.push(xAxis)
        this.chartOption.option.series.push(series)

        this.chartOption.option.dataZoom[0].xAxisIndex.push(index)
      })
      this.showChart = true
    },
    parseTableData() {
      this.loadingMap.tableLoading = true
      this.tableData = []
      let diffDay
      if (this.contrast) {
        diffDay = this.$day(this.timeRangeFirst[0]).diff(this.timeRangeSecond[0], 'day')
      }
      const propName = Object.keys(this.chartData)
      // 初步处理数据结构
      const parse = {}
      propName.forEach(prop => {
        parse[prop] = {}
        const [baseData, contrastData] = this.chartData[prop]
        if (this.contrast) {
          parse[prop].contrast = new Map()
          contrastData.forEach(item => parse[prop].contrast.set(item.date, item.count))
        }
        parse[prop].base = new Map()
        baseData.forEach(item => parse[prop].base.set(item.date, item.count))
      })
      // 转化数据结构成日期为KEY的对象
      const data = {}
      Object.entries(parse).forEach(([type, typeData]) => {
        Object.entries(typeData).forEach(([prop, propData]) => {
          if (!data.hasOwnProperty(prop)) {
            data[prop] = {}
          }
          propData.forEach((count, date) => {
            if (!data[prop].hasOwnProperty(date)) {
              data[prop][date] = {}
            }
            data[prop][date][type] = count
          })
        })
      })
      // 转化为table数据结构
      Object.entries(data.base).forEach(([date, dateData], tableItemIndex) => {
        const index = `tableItem-${tableItemIndex}`
        const temp = { date, index }
        if (this.contrast) {
          temp.date = '展开'
          temp.children = []
          const baseIndex = `tableItem-${tableItemIndex}-baseChild`
          const baseChild = { date, index: baseIndex }
          Object.entries(data.base[date]).forEach(([type, count]) => {
            baseChild[type] = count
          })
          const baseDate = this.$day(date)
          const absDiff = Math.abs(diffDay)
          let contrastDate = diffDay > 0 ? baseDate.subtract(absDiff, 'day') : baseDate.add(absDiff, 'day')
          contrastDate = contrastDate.format('YYYY-MM-DD')
          const contrastIndex = `tableItem-${tableItemIndex}-contrastChild`
          const contrastChild = { date: contrastDate, index: contrastIndex }
          const contrastData = data.contrast[contrastDate]
          contrastData && Object.entries(contrastData).forEach(([type, count]) => {
            contrastChild[type] = count
          })
          temp.children.push(baseChild)
          temp.children.push(contrastChild)
        } else {
          Object.entries(dateData).forEach(([type, count]) => {
            temp[type] = count
          })
        }
        this.tableData.push(temp)
      })
      this.dateAlign = this.contrast ? 'left' : 'center'
      const baseTitle = this.timeRangeFirst.map(date => this.$day(date).format('YYYY-MM-DD')).join(' 至 ')
      const contrastTitle = this.contrast ? ' 对比 ' + this.timeRangeSecond.map(date => this.$day(date).format('YYYY-MM-DD')).join(' 至 ') : ''
      this.tableHead = baseTitle + contrastTitle
      this.loadingMap.tableLoading = false
    },
    exportData() {
      const header = ['日期'].concat(this.allChartType.map(item => item.text))
      const filename = this.allChartType.find(item => item.label === this.chartType).text
      let data
      if (this.contrast) {
        data = this.tableData.map(item => {
          const itemClone = this.$common.deepCopy(item)
          delete itemClone.index
          return itemClone.children.map(child => {
            const childClone = this.$common.deepCopy(child)
            delete childClone.index
            return Object.values(childClone)
          })
        }).flat(1)
      } else {
        data = this.tableData.map(item => {
          const itemClone = this.$common.deepCopy(item)
          delete itemClone.index
          return Object.values(itemClone)
        })
      }
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

<style lang="scss" scoped>
.dataCenter-overview{
  padding: 20px;
  >*:not(:first-of-type){
    margin-top: 20px;
  }
  .chart-filter{
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    background-color: #ddd;
    .time-range-wrap{
      .break{
        margin: 0 20px;
      }
      .getChartData{
        margin-left: 20px;
      }
    }
  }
  .table-wrap{
    .table-head{
      line-height: 42px;
      background-color: #ddd;
      padding: 0 10px;
      justify-content: space-between;
    }
  }
}
</style>
