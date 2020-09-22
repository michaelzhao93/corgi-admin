import Mock from 'mockjs'
import dayjs from 'dayjs'

Mock.Random.extend({
  statsIcon() {
    const arr = ['rise', 'descend']
    return this.pick(arr)
  }
})

function chartData(date, text) {
  const [start, end] = JSON.parse(date).map(item => dayjs(item))
  const range = Math.abs(start.diff(end, 'day'))
  const result = []
  for (let i = 0; i < range; i++) {
    const temp = {}
    temp[start.add(i, 'day').format('YYYY-MM-DD')] = `@natural(100,500)${text || ''}`
    result.push(temp)
  }
  return result
}

export default [
  {
    url: '/tool/stats',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: {
          ystdRegis: {
            count: '@natural(200,1000)',
            day: '@natural(5,50)',
            dayType: '@statsIcon',
            week: '@natural(5,20)',
            weekType: '@statsIcon'
          },
          totalRegis: {
            count: '@natural(100000,500000)',
            day: '@natural(5,50)',
            dayType: '@statsIcon',
            week: '@natural(5,20)',
            weekType: '@statsIcon'
          },
          ystdActive: {
            count: '@natural(200,1000)',
            day: '@natural(5,50)',
            dayType: '@statsIcon',
            week: '@natural(5,20)',
            weekType: '@statsIcon'
          },
          totalActive: {
            count: '@natural(100000,500000)',
            day: '@natural(5,50)',
            dayType: '@statsIcon',
            week: '@natural(5,20)',
            weekType: '@statsIcon'
          }
        }
      }
    }
  },
  {
    url: '/tool/getChart',
    type: 'get',
    response: config => {
      const { timeRangeFirst, timeRangeSecond } = config.query
      const temp = []
      temp.push(chartData(timeRangeFirst))
      timeRangeSecond && temp.push(chartData(timeRangeSecond))
      return {
        code: 0,
        data: {
          ystdRegis: temp,
          totalRegis: temp,
          ystdActive: temp,
          totalActive: temp
        }
      }
    }
  },
  {
    url: '/tool/getDAU',
    type: 'get',
    response: config => {
      const { baseTimeRange, MOMrange, YOYrange } = config.query
      const data = { DAU: chartData(baseTimeRange) }
      data.MOM = MOMrange ? chartData(MOMrange, '%') : void 0
      data.YOY = YOYrange ? chartData(YOYrange, '%') : void 0
      return {
        code: 0,
        data
      }
    }
  },
  {
    url: '/tool/getMAU',
    type: 'get',
    response: config => {
      const { baseTimeRange, MOMrange, YOYrange } = config.query
      const data = { MAU: chartData(baseTimeRange) }
      data.MOM = MOMrange ? chartData(MOMrange, '%') : void 0
      data.YOY = YOYrange ? chartData(YOYrange, '%') : void 0
      return {
        code: 0,
        data
      }
    }
  }
]
