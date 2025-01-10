import request from './index'
import { useStorage } from '../utils/storage'
export const login = (body) => request.post('/api/login', body).then(res => {
  useStorage('token', res.data)
  return res
})

export const getInfo = () => request.get('/api/get')