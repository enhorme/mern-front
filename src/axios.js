import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7777',
});

instance.interceptors.request.use(
  (config) => {
    config.headers.authorization = window.localStorage.getItem('token') || '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
