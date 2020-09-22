import request from '@/utils/request'

// 获取话题
export function getTopics(params) {
  return request({
    url: '/tool/get_topics',
    method: 'get',
    params
  })
}

// 添加话题
export function addTopic(params) {
  return request({
    url: '/tool/add_topic',
    method: 'get',
    params
  })
}

// 编辑话题
export function updateTopic(params) {
  return request({
    url: '/tool/update_topic',
    method: 'get',
    params
  })
}
