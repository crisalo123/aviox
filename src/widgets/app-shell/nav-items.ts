import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Map,
  Navigation2,
  PlaneTakeoff,
  UserCircle,
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

interface NavItemDef {
  to: string
  labelKey: string
  icon: LucideIcon
  roles?: readonly UserRole[]
}

const NAV_ITEM_DEFS: readonly NavItemDef[] = [
  { to: '/inicio', labelKey: 'nav.inicio', icon: LayoutDashboard },
  { to: '/perfil', labelKey: 'nav.perfil', icon: UserCircle },
  { to: '/flota', labelKey: 'nav.flota', icon: PlaneTakeoff },
  { to: '/horario', labelKey: 'nav.horario', icon: CalendarDays },
  {
    to: '/reservas',
    labelKey: 'nav.reservas',
    icon: ClipboardList,
    roles: ['student', 'tutor'] as const,
  },
  { to: '/documentos', labelKey: 'nav.documentos', icon: FileText },
  {
    to: '/seguimiento',
    labelKey: 'nav.seguimiento',
    icon: Navigation2,
    roles: ['student', 'tutor'] as const,
  },
  { to: '/pista', labelKey: 'nav.pista', icon: Map },
  {
    to: '/tutor/progreso',
    labelKey: 'nav.tutorProgreso',
    icon: Users,
    roles: ['tutor'] as const,
  },
  {
    to: '/tutor/finanzas',
    labelKey: 'nav.tutorFinanzas',
    icon: Wallet,
    roles: ['tutor'] as const,
  },
] as const

export function navItemsForRole(
  role: UserRole,
  t: (key: string) => string,
): NavItem[] {
  return NAV_ITEM_DEFS.filter((item) => {
    if (!item.roles) return true
    return item.roles.includes(role)
  }).map((item) => ({
    to: item.to,
    icon: item.icon,
    label: t(item.labelKey),
    roles: item.roles,
  }))
}
