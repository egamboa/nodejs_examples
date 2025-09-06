import { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './AuthContext'
import type { User } from '../interfaces/User'

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000') + '/auth'
const LOCAL_STORAGE_KEY = 'jwt:token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken)
        setUser(decoded)
        setToken(storedToken)
      } catch (error) {
        console.error('Invalid token in localStorage', error)
        localStorage.removeItem(LOCAL_STORAGE_KEY)
      }
    }
    setLoading(false);
  }, [])

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password })
    const token = response.data.token
    const decoded = jwtDecode<User>(token)

    setToken(token)
    setUser(decoded)
    localStorage.setItem(LOCAL_STORAGE_KEY, token)
  }

  const register = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password })
    setUser({ id: response.data.id, email: response.data.email })
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
