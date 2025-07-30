import axios from './config'

export const getBanners = () => {
  return axios.get('/banners')
}

export const getImages = async (page) => {
  const res = await axios.get('/images', {
    params: { page }
  })
  return res.data
}