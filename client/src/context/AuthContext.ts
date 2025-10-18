import { createContext } from 'react'
import type { User } from '../interfaces/User'

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});
