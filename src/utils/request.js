/* 封装axios用于发送请求 */
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// 创建一个新的axios实例
const request = axios.create({
  baseURL:'',
  timeout: 60000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('token',1111);
   if (store.getters.token) {
     config.headers.Authorization = `Bearer ${store.getters.token}`
   }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { data, message, success } = response.data // 默认json格式
  // 要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, function (error) {
  // 对响应错误做点什么
  Message({ type: 'error', message: error.message }) //提示错误消息
  return Promise.reject(error)
})

export default request