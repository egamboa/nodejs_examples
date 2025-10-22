import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants';

const instance = axios.create({
  baseURL: (import.meta.env.VITE_API_URL ?? 'http://localhost:4000'),
});

// Request interceptor: attach Authorization header from localStorage if present
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 centrally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch {
        // ignore
      }
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
