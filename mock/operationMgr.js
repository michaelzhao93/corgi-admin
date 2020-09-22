import Mock from 'mockjs'

Mock.Random.extend({
  activityStatus() {
    const arr = ['active', 'finished', 'stopped']
    return this.pick(arr)
  },
  censorshipStatus() {
    const arr = ['autoPass', 'autoFaild', 'manualPass', 'manualFaild','no_face']
    return this.pick(arr)
  }
})

export default [
  {
    url: '/tool/defaultActiveType',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'activityIcon': '@image("250x250")',
          'activityType': '@name()',
          'createCount': '@natural()',
          'status|1': true
        }
      ]
      return result
    }
  },
  {
    url: '/tool/manualActiveType',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'activityType': '@name()',
          'createTime': '@datetime()',
          'createCount': '@natural()'
        }
      ]
      return result
    }
  },
  {
    url: '/tool/defaultTopic',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'topic': '@csentence(10,20)',
          'topicCount': '@natural()',
          'status|1': true
        }
      ]
      return result
    }
  },
  {
    url: '/tool/manualTopic',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'topic': '@csentence(10,20)',
          'topicCount': '@datetime()'
        }
      ]
      return result
    }
  },
  {
    url: '/tool/defaultInterest',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'interest': '@csentence(10,20)',
          'interestType': '@natural()',
          'interestCount': '@natural()',
          'status|1': true
        }
      ]
      return result
    }
  },
  {
    url: '/tool/manualInterest',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'interest': '@csentence(10,20)',
          'interestType': '@natural()',
          'interestCount': '@natural()'
        }
      ]
      return result
    }
  },
  {
    url: '/tool/defaultLabel',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'label': '@csentence(10,20)',
          'labelCount': '@natural()',
          'status|1': true
        }
      ]
      return result
    }
  },
  {
    url: '/tool/manualLabel',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'label': '@csentence(10,20)',
          'labelCount': '@natural()'
        }
      ]
      return result
    }
  }
]
