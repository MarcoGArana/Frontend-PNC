import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-pnc-production-d8ff.up.railway.app/api',
});

API.interceptors.request.use((conf) => {
  const token = localStorage.getItem('token');
  if (token) {
    conf.headers.Authorization = `Bearer ${token}`;
  }
  return conf;
});

export default API;