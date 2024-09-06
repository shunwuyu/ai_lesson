import Axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = '' //请求接口url 如果不配置 则默认访问链接地址
const TIME_OUT = 20000 // 接口超时时间

const instance = Axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})
// 不需要token的接口白名单
const whiteList = ['/user/login', '/user/checkCode', '/user/refreshToken']

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
      if (config.url && typeof config.url === 'string') {
        if (!whiteList.includes(config.url)) {
          let Token = getToken()
          if (Token && Token.length > 0) {
            config.headers && (config.headers['Authorization'] = Token)
          }
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

export default instance