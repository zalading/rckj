import request from '@/utils/request'
//登录
  export const loginApi = data => request({
    url: '/login',
    method: 'post',
    data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })

//统计相关数据
export const statisticsApi=params=>request.get('/getKeyword/statistics',{params})

//获取用户关键词
  export const getInfoApi=params=>request.get('/shop/area/getInfo',{params})