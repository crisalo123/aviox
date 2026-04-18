import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '@/features/auth/model/useAuth'

export function RequireTutor({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  if (user?.role !== 'tutor') {
    return <Navigate to="/inicio" replace />
  }
  return <>{children}</>
}
