import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import type { User, UserRole } from '@/entities/user/model/types'
import { sleep } from '@/shared/lib/sleep'

const STORAGE_KEY = 'ra_auth_v1'

export interface LoginCredentials {
  email: string
  password: string
  role: UserRole
}

interface AuthContextValue {
  user: User | null
  login: (c: LoginCredentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

function persistUser(user: User | null) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser())

  const login = useCallback(async (c: LoginCredentials) => {
    await sleep(450)
    const display =
      c.email.split('@')[0]?.replaceAll('.', ' ') ?? 'Piloto'
    const next: User = {
      id: crypto.randomUUID(),
      email: c.email.trim().toLowerCase(),
      displayName: display.charAt(0).toUpperCase() + display.slice(1),
      role: c.role,
    }
    setUser(next)
    persistUser(next)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    persistUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
