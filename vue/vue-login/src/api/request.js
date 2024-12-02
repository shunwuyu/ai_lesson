import axios from 'axios'

export const service = axios.create({
    baseURL: 'http://localhost:3000'   //配置axios请求的地址
})
