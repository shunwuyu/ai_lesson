import axios from './config'

export const getBanners = () => {
  return axios.get('/banners')
}