import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants';

const instance = axios.create({
  baseURL: (import.meta.env.VITE_API_URL ?? 'http://localhost:4000'),
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
