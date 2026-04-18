import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/model/useAuth'

export function RequireAuth() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/iniciar-sesion" replace />
  }

  return <Outlet />
}
