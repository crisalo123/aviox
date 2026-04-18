import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import type { User, UserRole } from '@/entities/user/model/types'
import { MOCK_STUDENT_ROWS } from '@/features/tutor/model/mockStudents'
import { sleep } from '@/shared/lib/sleep'

const STORAGE_KEY = 'ra_auth_v1'

/** Acceso temporal fijo (sin backend). */
export const DEMO_EMAIL = 'sebastian.constructorabogota@gmail.com'
/** Misma contraseña que `DEMO_PASSWORD`. El id coincide con el primer alumno mock (Ana Torres) para reservas y mapa. */
export const DEMO_STUDENT_EMAIL = 'alumno@demo.aviox.app'
export const DEMO_PASSWORD = 'EZc@nør557!$'

export const INVALID_LOGIN_ERROR = 'INVALID_LOGIN'

export interface LoginCredentials {
  email: string
  password: string
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
    const emailNorm = c.email.trim().toLowerCase()
    const studentEmailNorm = DEMO_STUDENT_EMAIL.trim().toLowerCase()
    const okTutor = emailNorm === DEMO_EMAIL.trim().toLowerCase() && c.password === DEMO_PASSWORD
    const okStudent =
      emailNorm === studentEmailNorm && c.password === DEMO_PASSWORD
    if (!okTutor && !okStudent) {
      throw new Error(INVALID_LOGIN_ERROR)
    }
    const next: User = okStudent
      ? (() => {
          const row = MOCK_STUDENT_ROWS[0]
          if (!row) {
            throw new Error(INVALID_LOGIN_ERROR)
          }
          return {
            id: row.id,
            email: emailNorm,
            displayName: row.name,
            role: 'student' as const satisfies UserRole,
          }
        })()
      : (() => {
          const display =
            emailNorm.split('@')[0]?.replaceAll('.', ' ') ?? 'Piloto'
          return {
            id: crypto.randomUUID(),
            email: emailNorm,
            displayName: display.charAt(0).toUpperCase() + display.slice(1),
            role: 'tutor' as const satisfies UserRole,
          }
        })()
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
