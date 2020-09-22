export default {
  data() {
    return {
      chartType: 'mau',
      allChartType: [
        { label: 'mau', text: '基准' },
        { label: 'MOM', text: '环比' },
        { label: 'YOY', text: '同比' }
      ],
      baseTimeRange: [],
      MOM: false,
      YOY: false,
      chartData: {},
      tableHead: '',
      tableMOM: false,
      tableYOY: false,
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
            text: 'MAU统计',
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
              return params
                .map(item => {
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
            data: ['基准', '同比', '环比'],
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
