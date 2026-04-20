export type UserRole = 'student' | 'tutor' | 'user'

export interface User {
  id: string
  email: string
  displayName: string
  role: UserRole
  /** Foto de perfil (data URL), solo en este navegador. */
  avatarDataUrl?: string
}

export const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Estudiante',
  tutor: 'Tutor / Instructor',
  user: 'Usuario',
}
