import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './AuthContext'
import type { User } from '../interfaces/User'
import api from '../api/axios';

const LOCAL_STORAGE_KEY = 'jwt:token'

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading , setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedToken) {  
        try {
          const { data } = await api.get(`/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setUser(data.user);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    }
    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post(`/auth/login`, { email, password })
    const token = response.data.token
    const decoded = jwtDecode<User>(token)
    setIsAuthenticated(true);
    setUser(decoded)
    localStorage.setItem(LOCAL_STORAGE_KEY, token)
  }

  const register = async (email: string, password: string) => {
    const response = await api.post(`/auth/register`, { email, password })
    setUser({ id: response.data.id, email: response.data.email })
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={
      { user, login, register, logout, loading, isAuthenticated }
    }>
      {children}
    </AuthContext.Provider>
  )
}
