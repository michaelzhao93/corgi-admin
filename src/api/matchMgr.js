import request from '@/utils/request'
import Qs from 'qs'

// 搜索用户
export function get_match_factor(params) {
  return request({
    url: '/tool/get_match_factor',
    method: 'get',
    params
  })
}

export function get_match_factor2(params) {
  return request({
    url: '/tool/get_match_factor2',
    method: 'get',
    params
  })
}

export function get_match_ratio(params) {
  return request({
    url: '/tool/get_match_ratio',
    method: 'get',
    params
  })
}

export function set_match_ratio(params) {
  return request({
    url: '/tool/set_match_ratio',
    method: 'get',
    params
    })
}

export function set_match_factor2(params) {
  return request({
    url: '/tool/set_match_factor2',
    method: 'get',
    params
    })
}

export function update_match_factor(params) {
  return request({
    url: '/tool/update_match_factor',
    method: 'get',
    params
    })
}

export function refresh_all_match() {
  return request({
    url: '/tool/refresh_all_match',
    method: 'get'
    })
}

