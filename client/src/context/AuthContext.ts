import { createContext } from 'react'
import type { AuthContextType } from '../interfaces/AuthContextType'

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});
