import axios from './config'

export const getDetail = (id) => {
    return axios.get(`/detail/:id`)
}