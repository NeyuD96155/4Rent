import axios from 'axios';
const baseUrl = 'http://4rent.tech:8081/';

const config = {
  baseUrl,
  timeout: 3000000,
};
const api = axios.create(config);
api.defaults.baseURL = baseUrl;
const handleBefore = config => {
  const token = localStorage.getItem('token')?.replaceAll('"', '');
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};
// const handleError = error => {
//   console.log(error);
//   return;
// };
api.interceptors.request.use(handleBefore, null);
// api.interceptors.response.use(null, handleError);

export default api;