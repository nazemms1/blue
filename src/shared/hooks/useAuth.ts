import { useState, useCallback } from 'react'
import type { User } from '@shared/types'

const STORAGE_KEY = 'blue_user'

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(readUser)

  const login = useCallback((credentials: { email: string; password: string }) => {
     const mockUser: User = {
      id: '1',
      name: 'Admin User',
      email: credentials.email,
      role: 'admin',
      permissions: ['media', 'billing'],
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
    localStorage.setItem('auth_token', 'mock-jwt-token')
    setUser(mockUser)
    return Promise.resolve(mockUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('auth_token')
    setUser(null)
  }, [])

  return { user, login, logout, isAuthenticated: user !== null }
}
