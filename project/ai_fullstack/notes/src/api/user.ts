import axios from './config';

export const getUser = () => {
    return axios.get('/user');
}

export const doLogin = (data: { name: string; password: string }) => {
    return axios.post('/auth/login', data);
} 

export const getAiAvatar = () => {
    return axios.get('/user/gen_avatar');
}