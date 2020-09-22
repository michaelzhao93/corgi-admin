import request from '@/utils/request'
import axios from 'axios'

// 搜索用户
export function queryUser(params) {
  return request({
    url: '/tool/query_user',
    method: 'get',
    params
  })
}

// 统计用户数量
export function countUser(params) {
  return request({
    url: '/tool/count_user',
    method: 'get',
    params
  })
}

// 通过昵称审核
export function agreeNickname(params) {
  return request({
    url: '/tool/agree_nickname',
    method: 'get',
    params
  })
}

// 通过描述审核
export function agreeDesc(params) {
  return request({
    url: '/tool/agree_desc',
    method: 'get',
    params
  })
}

// 通过用户审核状态
export function agreeUser(params) {
  return request({
    url: '/tool/agree_user',
    method: 'get',
    params
  })
}

// 不通过用户审核状态
export function failUser(params) {
  return request({
    url: '/tool/fail_user',
    method: 'get',
    params
  })
}

// 删除用户
export function deleteUser(params) {
  return request({
    url: '/tool/delete_user',
    method: 'get',
    params
  })
}

// 删除用户图片
export function deleteUserPic(params) {
  return request({
    url: '/user/delete_user_pic',
    method: 'get',
    params
  })
}

// 搜索活动
export function queryActivity(params) {
  return request({
    url: '/tool/query_activity',
    method: 'get',
    params
  })
}

// 统计活动总数
export function countActivity(params) {
  return request({
    url: '/tool/count_activity',
    method: 'get',
    params
  })
}

// 通过活动标题
export function agreeTitle(params) {
  return request({
    url: '/tool/agree_title',
    method: 'get',
    params
  })
}

// 通过活动内容
export function agreeContent(params) {
  return request({
    url: '/tool/agree_content',
    method: 'get',
    params
  })
}

// 通过活动类型
export function agreeActivityType(params) {
  return request({
    url: '/tool/agree_type',
    method: 'get',
    params
  })
}

// 通过活动
export function agreeActivity(params) {
  return request({
    url: '/tool/agree_activity',
    method: 'get',
    params
  })
}

// 不通过活动
export function failActivity(params) {
  return request({
    url: '/tool/fail_activity',
    method: 'get',
    params
  })
}

// 删除活动
export function removeActivity(params) {
  return request({
    url: '/tool/remove_activity',
    method: 'get',
    params
  })
}

// 删除活动图片
export function deleteActivityPic(params) {
  return request({
    url: '/activity/delete_activity_pic',
    method: 'get',
    params
  })
}

// 获得审核图片
export function getCheckPic(params) {
  return request({
    url: '/tool/get_check_pic',
    method: 'get',
    params
  })
}

// 获得审核图片总数
export function countCheckPic(params) {
  return request({
    url: '/tool/count_check_pic',
    method: 'get',
    params
  })
}


// 图片审核通过
export function passPic(params) {
  return request({
    url: '/tool/pass_pic',
    method: 'get',
    params
  })
}

// 图片审核未通过
export function refusePic(params) {
  return request({
    url: '/tool/refuse_pic',
    method: 'get',
    params
  })
}

export function no_face_pic(params) {
  return request({
    url: '/tool/no_face_pic',
    method: 'get',
    params
  })
}

// 语音审核通过
export function pass_sound(params) {
  return request({
    url: '/tool/pass_sound',
    method: 'get',
    params
  })
}

// 语音审核未通过
export function refuse_sound(params) {
  return request({
    url: '/tool/refuse_sound',
    method: 'get',
    params
  })
}

// 图片审核未通过
export function getCountTask(params) {
  return request({
    url: '/tool/count_task',
    method: 'get',
    params
  })
}

// 获取举报列表
export function getReportList(params) {
  return request({
    url: '/tool/get_report',
    method: 'get',
    params
  })
}

// 获取举报列表计数
export function countReport(params) {
  return request({
    url: '/tool/count_report',
    method: 'get',
    params
  })
}

// 修改举报状态
export function updateReportStatus(params) {
  return request({
    url: '/tool/update_report_status',
    method: 'get',
    params
  })
}

export function list_banner(params) {
  return request({
    url: '/banner/list_banner',
    method: 'get',
    params
  })
}
export function delete_banner(params) {
  return request({
    url: '/banner/delete_banner',
    method: 'get',
    params
  })
}

export function add_banner(params) {
  let data = params;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
  axios.defaults.headers.common['jwt'] = token;
  axios.post('http://139.224.63.240:7888/banner/add_banner',data)
  .then(res=>{
      console.log('res=>',res);            
  })
  }

  export function update_banner(params) {
    let data = params;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM'
    axios.defaults.headers.common['jwt'] = token;
    axios.post('http://139.224.63.240:7888/banner/update_banner',data)
    .then(res=>{
        console.log('res=>',res);            
    })
    }
  export function get_upload_token(params) {
    return request({
      url: '/user/get_upload_token',
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


      export function get_by_date(params) {
        return request({
          url: '/billboard/get_by_date',
          method: 'get',
          params
        })
      }


      export function update_by_nickname(params) {
        return request({
          url: '/billboard/update_by_nickname',
          method: 'get',
          params
        })
      }


  // 获得审核图片
  export function get_check_sound(params) {
    return request({
      url: '/tool/get_check_sound',
      method: 'get',
      params
    })
  }

  export function count_check_sound(params) {
    return request({
      url: '/tool/count_check_sound',
      method: 'get',
      params
    })
  }


export function add_system_message(params) {
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
  axios.post('http://139.224.63.240:7888/system/add_system_message',data)
  .then(res=>{
      console.log('res=>',res);            
  })
  }