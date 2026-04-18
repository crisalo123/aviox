import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Map,
  PlaneTakeoff,
  Users,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { UserRole } from '@/entities/user/model/types'
import { ROLE_LABELS } from '@/entities/user/model/types'
import { useAuth } from '@/features/auth/model/useAuth'
import { FleetOpsSummary } from '@/features/aircraft/ui/FleetOpsSummary'
import { Card } from '@/shared/ui/Card'

const cards: {
  to: string
  title: string
  desc: string
  icon: LucideIcon
  roles: readonly UserRole[]
}[] = [
  {
    to: '/flota',
    title: 'Flota',
    desc: 'Aeronaves con foto, matrícula y datos para planear tu clase.',
    icon: PlaneTakeoff,
    roles: ['student', 'tutor', 'user'],
  },
  {
    to: '/horario',
    title: 'Horario de vuelos',
    desc: 'Consulta bloques libres y reserva (estudiante).',
    icon: CalendarDays,
    roles: ['student', 'tutor', 'user'],
  },
  {
    to: '/reservas',
    title: 'Reservas',
    desc: 'Gestiona tus clases o revisa las de tus alumnos.',
    icon: ClipboardList,
    roles: ['student', 'tutor'],
  },
  {
    to: '/pista',
    title: 'Mapa de pista',
    desc: 'Referencia visual de zonas en la pista.',
    icon: Map,
    roles: ['student', 'tutor', 'user'],
  },
  {
    to: '/tutor/progreso',
    title: 'Progreso',
    desc: 'Tablero de avance de estudiantes.',
    icon: Users,
    roles: ['tutor'],
  },
  {
    to: '/tutor/finanzas',
    title: 'Finanzas',
    desc: 'Ganancias y saldo estimado.',
    icon: Wallet,
    roles: ['tutor'],
  },
]

export function DashboardPage() {
  const { user } = useAuth()
  if (!user) return null

  const visible = cards.filter((c) => c.roles.includes(user.role))

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand/80">
          Panel principal
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Hola, {user.displayName}
        </h1>
        <p className="max-w-xl text-sm font-medium leading-relaxed text-ink-muted md:text-base">
          Rol: <span className="font-semibold text-ink">{ROLE_LABELS[user.role]}</span>.
          Usa el menú lateral o los accesos rápidos para moverte por la operación.
        </p>
      </header>

      <FleetOpsSummary />

      <div className="grid gap-5 sm:grid-cols-2">
        {visible.map((c) => (
          <Link key={c.to} to={c.to} className="group block">
            <Card className="h-full border-white/90 transition duration-300 group-hover:-translate-y-1 group-hover:border-brand/20 group-hover:shadow-xl group-hover:shadow-brand/10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2.5 text-base font-bold tracking-tight text-ink">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand/12 to-teal-500/10 text-brand ring-1 ring-brand/10">
                      <c.icon className="h-5 w-5" aria-hidden />
                    </span>
                    {c.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.desc}</p>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-ink-muted transition duration-300 group-hover:translate-x-1 group-hover:text-brand"
                  aria-hidden
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
