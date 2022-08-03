import store from '@/store';
import axios from 'axios'
import router from '@/router';
import { Message } from 'element-ui'
import { getTokenTime } from './auth';
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout:5000
}) // 创建一个axios的实例
function isTimeOut(){
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2*60*60 * 1000
  return currentTime - tokenTime > timeout
}
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeOut()) {
      console.log('过期');
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization='Bearer '+store.state.user.token
    }
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
  //请求成功的函数
  const { success, data, message } = res.data
  if (success) {
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
  },
  async function (error) {
    //对象应错误做点什么
    if (error?.response?.state === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
