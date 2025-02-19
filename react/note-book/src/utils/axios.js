// src/utils/axios.js
import axios from 'axios'
import { Toast } from 'zarm'

const MODE = import.meta.env.MODE // 环境变量
console.log(MODE, '////')

axios.defaults.baseURL = MODE == 'development' ? '/api' : 'http://api.chennick.wang'
// 让 Axios 发起跨域请求时携带凭证（如 Cookie、HTTP 认证信息等）。
// 在跨域请求中，默认情况下浏览器不会发送这些凭证，设置为 true 后，
// 服务端也需正确配置响应头（如 Access-Control-Allow-Credentials: true），
// 才能让请求携带凭证正常工作。
axios.defaults.withCredentials = true
// 当你使用 Axios 发起请求时，请求头中就会包含 
// fetch  表示异步
// X-Requested-With: XMLHttpRequest，服务器端可以根据这个请求头来进行相应的处理。
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// jwt
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
// 请求体
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if (res.data.msg) Toast.show(res.data.msg)
    if (res.data.code == 401) {
      window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default axios
