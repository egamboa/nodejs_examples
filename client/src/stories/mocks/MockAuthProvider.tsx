import { AuthContext } from '../../context/AuthContext'
import type { AuthContextType } from '../../interfaces/AuthContextType'
import type { User } from '../../interfaces/User'

interface MockAuthProviderProps {
  children: React.ReactNode
  mockUser?: User | null
}

export function MockAuthProvider({ children, mockUser }: MockAuthProviderProps) {
  const mockContext: AuthContextType = {
    user: mockUser ?? null,
    token: 'mock-token',
    login: async () => {},
    register: async () => {},
    logout: () => console.log('mock logout'),
  }

  return <AuthContext.Provider value={mockContext}>{children}</AuthContext.Provider>
}
