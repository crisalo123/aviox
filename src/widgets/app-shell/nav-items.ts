import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Map,
  PlaneTakeoff,
  Users,
  Wallet,
} from 'lucide-react'
import type { UserRole } from '@/entities/user/model/types'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Si no se define, el ítem es visible para cualquier rol autenticado */
  roles?: readonly UserRole[]
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: '/inicio', label: 'Inicio', icon: LayoutDashboard },
  { to: '/flota', label: 'Flota', icon: PlaneTakeoff },
  { to: '/horario', label: 'Horario de vuelos', icon: CalendarDays },
  {
    to: '/reservas',
    label: 'Reservas',
    icon: ClipboardList,
    roles: ['student', 'tutor'] as const,
  },
  { to: '/pista', label: 'Mapa de pista', icon: Map },
  {
    to: '/tutor/progreso',
    label: 'Progreso alumnos',
    icon: Users,
    roles: ['tutor'] as const,
  },
  {
    to: '/tutor/finanzas',
    label: 'Ganancias y saldo',
    icon: Wallet,
    roles: ['tutor'] as const,
  },
] as const

export function navItemsForRole(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter((item) => {
    if (!item.roles) return true
    return item.roles.includes(role)
  })
}
