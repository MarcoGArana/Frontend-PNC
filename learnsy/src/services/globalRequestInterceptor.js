import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

API.interceptors.request.use((conf) => {
  const token = localStorage.getItem('token');
  if (token) {
    conf.headers.Authorization = `Bearer ${token}`;
  }
  return conf;
});

export default API;