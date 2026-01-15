import axios from './config';

export const getUser = () => {
    return axios.get('/user');
}

export const doLogin = (data: { username: string; password: string }) => {
    return axios.post('/login', data);
} 