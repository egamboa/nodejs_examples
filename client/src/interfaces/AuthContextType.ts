import type { User } from './User'

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void,
  isAuthenticated: boolean,
  loading: boolean
}
