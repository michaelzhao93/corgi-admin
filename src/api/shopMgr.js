import request from '@/utils/request'
import qs from 'qs';
import axios from 'axios'

// 搜索用户
export function get_bar_list(params) {
  return request({
    url: '/bar/get_bar_list',
    method: 'get',
    params
  })
}

export function get_upload_token(params) {
  return request({
    url: '/user/get_upload_token',
    method: 'get',
    params
  })
}

export function add_bar(params) {
//   return request({
//     url: '/bar/add_bar',
//     method: 'post',
// responseType: 'json',
//     headers: { 'Content-Type': 'application/json;charset=UTF-8' },
//     data:params

//     })
let data = params;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
axios.defaults.headers.common['jwt'] = token;
axios.post('https://api.corgi.org.cn/bar/add_bar',data)
.then(res=>{
    console.log('res=>',res);            
})
}


export function update_bar(params) {
  //   return request({
  //     url: '/bar/add_bar',
  //     method: 'post',
  // responseType: 'json',
  //     headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  //     data:params
  
  //     })
  let data = params;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
  axios.defaults.headers.common['jwt'] = token;
  axios.post('https://api.corgi.org.cn/bar/update_bar',data)
  .then(res=>{
      console.log('res=>',res);            
  })

}
export function get_bar_activity(params) {
  return request({
    url: '/bar/get_bar_activity',
    method: 'get',
    params
    })
}

export function add_bar_activity(params) {
  let data = params;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
  axios.defaults.headers.common['jwt'] = token;
  axios.post('https://api.corgi.org.cn/bar/add_bar_activity',data)
  .then(res=>{
      console.log('res=>',res);            
  })
}


export function get_bar(params) {
  return request({
    url: '/bar/get_bar',
    method: 'get',
    params
    })
}
export function update_bar_activity(params) {
  let data = params;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
  axios.defaults.headers.common['jwt'] = token;
  axios.post('https://api.corgi.org.cn/bar/update_bar_activity',data)
  .then(res=>{
      console.log('res=>',res);            
  })
}
export function delete_activity(params) {
  return request({
    url: '/activity/delete_activity',
    method: 'get',
    params
    })
}
export function recommend_activity(params) {
  return request({
    url: '/bar/recommend',
    method: 'get',
    params
    })
}
export function unrecommend_activity(params) {
  return request({
    url: '/bar/unrecommend',
    method: 'get',
    params
    })
}
export function list_hot_activity(params) {
  return request({
    url: '/hot/list_hot_activity',
    method: 'get',
    params
  })
}

export function update_hot_activity(params) {
  let data = params;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
  axios.defaults.headers.common['jwt'] = token;
  axios.post('http://139.224.63.240:7888/hot/update_hot_activity',data)
  .then(res=>{
      console.log('res=>',res);            
  })
  }

  export function add_hot_activity(params) {
    let data = params;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
    axios.defaults.headers.common['jwt'] = token;
    axios.post('http://139.224.63.240:7888/hot/add_hot_activity',data)
    .then(res=>{
        console.log('res=>',res);            
    })
    }

    export function delete_hot_activity(params) {
      return request({
        url: '/hot/delete_hot_activity',
        method: 'get',
        params
      })
    }

    export function get_detail(params) {
      return request({
        url: '/activity/get_detail',
        method: 'get',
        params
      })
    }