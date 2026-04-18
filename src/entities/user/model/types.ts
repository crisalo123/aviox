export type UserRole = 'student' | 'tutor' | 'user'

export interface User {
  id: string
  email: string
  displayName: string
  role: UserRole
}

export const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Estudiante',
  tutor: 'Tutor / Instructor',
  user: 'Usuario',
}
