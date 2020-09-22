export default {
  data() {
    return {
      chartType: 'register',
      allChartType: [
        { label: 'register', text: '新增注册人数' },
        { label: 'activity', text: '发布活动数' }
      ],
      timeRangeFirst: [],
      timeRangeSecond: [],
      showChart: false,
      chartData: {},
      tableHead: '',
      tableSortable: true,
      dateAlign: 'center',
      xAxisTpl: {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: true
        },
        data: []
      },
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
              type: 'cross',
              label: {
                show: true,
                precision: 0
              }
            },
            formatter(params) {
              return params.map(item => {
                return `<div class="flex chart-tool-item">
                          <div class="chart-tool-icon" style="background-color:${item.color};"></div>
                          <div>${item.seriesName} : ${item.value}</div>
                        </div>`
              }).join('')
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
              height: '55%',
              showDataShadow: false,
              left: '93%',
              top: '30%'
            }
          ],
          legend: {
            data: ['基准', '对比'],
            top: '12%'
          },
          grid: {
            top: '30%',
            bottom: '15%'
          },
          xAxis: [{}],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        }
      }
    }
  }
}
