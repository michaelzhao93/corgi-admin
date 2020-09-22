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
    url: '/tool/query_user',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'userId': '@natural()',
          'nickname': '@name()',
          'telNo': '@natural(12111111111,19999999999)',
          'openId': '@natural()',
          'status|1': true
        }
      ]
      return result
    }
  },
  {
    url: '/tool/query_activity',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'activityId': '@natural()',
          'title': '@ctitle(5,15)',
          'createTime': '@datetime()',
          'lastEditTime': '@datetime()',
          'activityStatus': '@activityStatus()',
          'censorshipType': '@censorshipStatus()'
        }
      ]
      return result
    }
  },
  {
    url: '/tool/query_avator',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'image': '@image("125x125")',
          'userId': '@natural()',
          'uploadTime': '@datetime()',
          'censorshipType': '@censorshipStatus()'
        }
      ]
      return result
    }
  },
  {
    url: '/tool/query_activeImage',
    type: 'get',
    response: config => {
      const { pageSize } = config.query
      const result = {
        code: 0,
        'total|100-500': 100
      }
      result[`data|${pageSize}`] = [
        {
          'image': '@image("720x300")',
          'userId': '@natural()',
          'activityId': '@natural()',
          'uploadTime': '@datetime()',
          'censorshipType': '@censorshipStatus()'
        }
      ]
      return result
    }
  }
]
