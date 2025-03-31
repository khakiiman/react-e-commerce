import axios, { AxiosInstance } from 'axios';
const api: AxiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  withCredentials: false,
});
api.interceptors.response.use(
  response => {
    return response;
  },
  error => Promise.reject(error)
);
export default api;
