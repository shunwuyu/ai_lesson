import axios from 'axios';

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        // Bearer 是一种用于身份验证的 token 类型，表示持有该 token 的用户或客户端被授权访问特定资源。
        // 标准
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

  
export default axios;