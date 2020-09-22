import '../style/index.scss'
import dateRangePicker from '../components/dateRangePicker'
import { getStatistics } from '@/api/dataCenter'
import Chart from '@/components/Chart'
import tableCommon from '@/mixins/tableCommon'
import { emit } from '@/mixins/commonSet'
import { seriesItemColor } from '@/utils/const'
export default {
  mixins: [tableCommon, emit],
  components: { Chart, dateRangePicker },
  data() {
    const today = this.$day(new Date()).subtract(1, 'day').toDate()
    return {
      seriesItemColor,
      baseTime: [today, today],
      useProp: [],
      chartData: {},
      tableHeight: 400,
      tableHead: '',
      loadingMap: {
        chartLoading: false
      },
      xAxisTpl: {
        type: 'category',
        data: []
      },
      chartTitle: this.$route.meta.title,
      seriesTpl: {
        name: '',
        type: 'line',
        smooth: true,
        data: []
      },
      chartOption: {
        option: {
          title: {
            text: '',
            top: '3%',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          dataZoom: [
            {
              show: true,
              start: 0,
              end: 100,
              xAxisIndex: [0]
            },
            {
              type: 'inside',
              start: 0,
              end: 100
            },
            {
              show: true,
              yAxisIndex: 0,
              filterMode: 'filter',
              width: 30,
              height: '65%',
              showDataShadow: false,
              left: '93%',
              top: '100',
              bottom: '100'
            }
          ],
          legend: {
            top: '50',
            data: []
          },
          grid: {
            top: '100',
            bottom: '70'
          },
          xAxis: [{}],
          yAxis: [
            {
              type: 'value',
              minInterval: 1
            }
          ],
          series: []
        }
      }
    }
  },
  computed: {
    isTimeSelected() {
      return this.baseTime.every(item => item)
    },
    chartOptionWatcher() {
      const option = this.chartOption
      option.option.title.text = this.chartTitle
      return option
    }
  },
  created() {
    this.handleChartBtnClick()
  },
  methods: {
    async handleChartBtnClick() {
      if (this.isTimeSelected) {
        try {
          this.loadingMap.tableLoading = true
          this.loadingMap.chartLoading = true
          await this.wrapGetChartData(this.chartType)
          if (this.chartData) {
            this.parseChartData()
            this.parseTableData()
          }
        } catch (err) {
          console.log(err)
        } finally {
          this.loadingMap.tableLoading = false
          this.loadingMap.chartLoading = false
        }
      }
    },
    async wrapGetChartData(type) {
      const result = await this.getChartData(type, this.baseTime)
      this.chartData = result.sort((a, b) => {
        const next = this.$day(a.date)
        const from = this.$day(b.date)
        return next.isAfter(from) ? 1 : -1
      })
    },
    async getChartData(type, date) {
      const [startDate, endDate] = date.map(item => this.$day(item).format('YYYY-MM-DD'))
      const result = await getStatistics({ type, startDate, endDate })
      return (result.hasOwnProperty('data') && Array.isArray(result.data) && result.data.length) ? result.data : []
    },
    parseChartData() {
      this.chartOption.option.xAxis = []
      this.chartOption.option.series = []

      const xAxis = this.$common.deepCopy(this.xAxisTpl)
      xAxis.data = this.chartData.map(chartItem => chartItem.date)
      this.chartOption.option.xAxis.push(xAxis)

      this.getAllKeys()
      this.useProp.forEach(orderKey => {
        const series = this.$common.deepCopy(this.seriesTpl)
        series.name = this.columnLable ? this.columnLable[orderKey] : orderKey
        series.data = this.chartData.map(item => item[orderKey])
        this.chartOption.option.series.push(series)
      })
      this.chartOption.option.legend.data = this.columnLable ? Object.values(this.columnLable) : this.useProp
      this.showChart = true
    },
    getAllKeys() {
      if (this.exceptProp) {
        const allKeys = {}
        this.chartData.forEach(item => {
          const filt = Object.keys(item).filter(prop => this.exceptProp.every(except => except !== prop))
          filt.forEach(prop => {
            allKeys[prop] = 1
          })
        })
        this.useProp = Object.keys(allKeys)
      } else {
        this.useProp = this.sortOrder
      }
    },
    parseTableData() {
      this.tableData = this.chartData
      this.tableHead = this.baseTime.map(item => this.$day(item).format('YYYY-MM-DD')).join(' — ')
      this.loadingMap.tableLoading = false
    },
    exportData() {
      const header = ['日期', ...(this.columnLable ? Object.values(this.columnLable) : this.useProp)]
      const useProp = ['date', ...this.useProp]
      const filename = this.tableHead + this.chartTitle
      const data = this.tableData.map(item => useProp.map(prop => item[prop]))
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
