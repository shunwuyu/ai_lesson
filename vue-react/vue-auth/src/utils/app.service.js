import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    // console.log('axios 请求拦截器', config);

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  response => {
    // console.log('axios 响应拦截器', response);

    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * Axios 实例
 */
const apiHttpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export { axios, apiHttpClient };