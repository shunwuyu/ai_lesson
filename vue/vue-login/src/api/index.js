import { service } from './request'


export const getPosts = () => {
    return service.get('/posts')
}

export const getPostById = (id) => {
    return service.get(`/posts/${id}`)
}