import { useState } from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import { AuthContext } from './AuthContext'
import type { User } from '../interfaces/User'

const API_BASE_URL = 'http://localhost:4000/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password })
    const token = response.data.token
    setToken(token)
    const decoded = jwtDecode<User>(token)
    localStorage.setItem('jwt:token', token)
    setUser(decoded)
  }

  const register = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password })
    setUser({ id: response.data.id, email: response.data.email })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
