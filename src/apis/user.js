import request from '@/utils/request'

  export const loginApi = data => request({
    url: '/login',
    method: 'post',
    data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })