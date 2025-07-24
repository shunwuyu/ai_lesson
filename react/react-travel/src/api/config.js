import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5173/api'

axios.interceptors.request.use((config) => {
  return config
})

axios.interceptors.response.use((response) => {
  return response.data
})

export default axios