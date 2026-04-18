import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FileText,
  Map,
  Navigation2,
  PlaneTakeoff,
  Users,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { UserRole } from '@/entities/user/model/types'
import { useAuth } from '@/features/auth/model/useAuth'
import { FleetOpsSummary } from '@/features/aircraft/ui/FleetOpsSummary'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Card } from '@/shared/ui/Card'

const cardDefs: {
  to: string
  titleKey: string
  descKey: string
  icon: LucideIcon
  roles: readonly UserRole[]
}[] = [
  {
    to: '/flota',
    titleKey: 'dash.card.flota.title',
    descKey: 'dash.card.flota.desc',
    icon: PlaneTakeoff,
    roles: ['student', 'tutor', 'user'],
  },
  {
    to: '/horario',
    titleKey: 'dash.card.horario.title',
    descKey: 'dash.card.horario.desc',
    icon: CalendarDays,
    roles: ['student', 'tutor', 'user'],
  },
  {
    to: '/reservas',
    titleKey: 'dash.card.reservas.title',
    descKey: 'dash.card.reservas.desc',
    icon: ClipboardList,
    roles: ['student', 'tutor'],
  },
  {
    to: '/documentos',
    titleKey: 'dash.card.documentos.title',
    descKey: 'dash.card.documentos.desc',
    icon: FileText,
    roles: ['student', 'tutor', 'user'],
  },
  {
    to: '/seguimiento',
    titleKey: 'dash.card.seguimiento.title',
    descKey: 'dash.card.seguimiento.desc',
    icon: Navigation2,
    roles: ['student', 'tutor'],
  },
  {
    to: '/pista',
    titleKey: 'dash.card.pista.title',
    descKey: 'dash.card.pista.desc',
    icon: Map,
    roles: ['student', 'tutor', 'user'],
  },
  {
    to: '/tutor/progreso',
    titleKey: 'dash.card.progreso.title',
    descKey: 'dash.card.progreso.desc',
    icon: Users,
    roles: ['tutor'],
  },
  {
    to: '/tutor/finanzas',
    titleKey: 'dash.card.finanzas.title',
    descKey: 'dash.card.finanzas.desc',
    icon: Wallet,
    roles: ['tutor'],
  },
]

export function DashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  if (!user) return null

  const visible = cardDefs.filter((c) => c.roles.includes(user.role))
  const roleLabel = t(`role.${user.role}`)

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand/80">
          {t('dashboard.panel')}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {t('dashboard.hello')}, {user.displayName}
        </h1>
        <p className="max-w-xl text-sm font-medium leading-relaxed text-ink-muted md:text-base">
          {t('dashboard.role')}: <span className="font-semibold text-ink">{roleLabel}</span>.{' '}
          {t('dashboard.intro')}
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
                    {t(c.titleKey)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t(c.descKey)}</p>
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
