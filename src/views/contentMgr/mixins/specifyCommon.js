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
  },
  methods: {
    
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
    }
  }
}
