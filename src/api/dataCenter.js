import request from '@/utils/request'

// 获取统计数据
export function getStatistics(params) {
  return request({
    url: '/tool/get_statistics',
    method: 'get',
    params
  })
}

// 获取统计总数据
export function sumStatistics(params) {
  return request({
    url: '/tool/sum_statistics',
    method: 'get',
    params
  })
}

// 获取统计总数据
export function getUserStay(params) {
  return request({
    url: '/tool/get_user_stay',
    method: 'get',
    params
  })
}

// 获取用户日均使用
export function getUserTrace(params) {
  return request({
    url: '/tool/get_user_trace',
    method: 'get',
    params
  })
}

// 获取统计人数
export function get_influencer(params) {
  return request({
    url: '/tool/get_influencer',
    method: 'get',
    params
  })
}