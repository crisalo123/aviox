import { Gauge, MapPin, Users } from 'lucide-react'
import type { Aircraft } from '@/entities/aircraft/model/types'
import type { AircraftOperationalStatus } from '@/entities/aircraft/model/opsStatus'
import { useAuth } from '@/features/auth/model/useAuth'
import { useFleetOps } from '@/features/aircraft/model/useFleetOps'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'

interface AircraftCardProps {
  aircraft: Aircraft
  variant?: 'full' | 'compact'
}

function statusPillClass(status: AircraftOperationalStatus): string {
  switch (status) {
    case 'in_flight':
      return 'bg-sky-500/95 text-white shadow-lg shadow-sky-600/40 ring-1 ring-white/30'
    case 'maintenance':
      return 'bg-amber-500/95 text-amber-950 ring-1 ring-amber-200/50'
    default:
      return 'bg-emerald-600/95 text-white ring-1 ring-white/25'
  }
}

function OpsStatusBadge({ status }: { status: AircraftOperationalStatus }) {
  const { t } = useLanguage()
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider ${statusPillClass(status)} ${status === 'in_flight' ? 'animate-pulse' : ''}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden />
      {t(`ops.${status}`)}
    </span>
  )
}

export function AircraftCard({ aircraft, variant = 'full' }: AircraftCardProps) {
  const { user } = useAuth()
  const { locale, t, ti } = useLanguage()
  const { getStatus, setAircraftStatus } = useFleetOps()
  const status = getStatus(aircraft.id)
  const isTutor = user?.role === 'tutor'
  const numLocale = locale === 'en' ? 'en-US' : 'es-CO'

  if (variant === 'compact') {
    return (
      <div
        id={aircraft.id}
        className="relative flex gap-3 rounded-xl border border-white/80 bg-white/90 p-3 shadow-md ring-1 ring-slate-900/5"
      >
        <div className="relative shrink-0">
          <img
            src={aircraft.imageUrl}
            alt=""
            className="h-20 w-28 rounded-lg object-cover"
            loading="lazy"
          />
          <div className="absolute right-1 top-1">
            <OpsStatusBadge status={status} />
          </div>
        </div>
        <div className="min-w-0 flex-1 text-sm">
          <p className="font-bold text-ink">{aircraft.nickname}</p>
          <p className="text-ink-muted">{aircraft.model}</p>
          <p className="mt-1 font-mono text-xs text-brand">{aircraft.registration}</p>
        </div>
      </div>
    )
  }

  return (
    <article id={aircraft.id}>
      <Card className="overflow-hidden p-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900/10">
          <img
            src={aircraft.imageUrl}
            alt={`${aircraft.model} ${aircraft.registration}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute right-3 top-3 z-[1]">
            <OpsStatusBadge status={status} />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-12">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-200/90">
              {aircraft.availableForScheduling
                ? t('aircraft.schedulingOn')
                : t('aircraft.schedulingOff')}
            </p>
            <h3 className="text-xl font-bold tracking-tight text-white">
              {aircraft.nickname}{' '}
              <span className="font-mono text-base font-semibold text-teal-100">
                {aircraft.registration}
              </span>
            </h3>
            <p className="text-sm text-white/85">{aircraft.model}</p>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <p className="text-sm leading-relaxed text-ink-muted">{aircraft.description}</p>

          {isTutor ? (
            <div className="rounded-xl border border-brand/15 bg-surface-0/90 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                {t('aircraft.simTitle')}
              </p>
              <p className="mt-1 text-xs text-ink-muted">{t('aircraft.simHelp')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="px-3 py-1.5 text-xs"
                  onClick={() => setAircraftStatus(aircraft.id, 'ground')}
                >
                  {t('ops.ground')}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-3 py-1.5 text-xs"
                  onClick={() => setAircraftStatus(aircraft.id, 'in_flight')}
                >
                  {t('ops.in_flight')}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-3 py-1.5 text-xs"
                  onClick={() => setAircraftStatus(aircraft.id, 'maintenance')}
                >
                  {t('ops.maintenance')}
                </Button>
              </div>
            </div>
          ) : (
            <p className="rounded-lg bg-surface-0/80 px-3 py-2 text-xs text-ink-muted">
              {t('aircraft.studentFleetHint')}
            </p>
          )}

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex gap-2 rounded-lg bg-surface-0/80 px-3 py-2">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {t('aircraft.capacity')}
                </dt>
                <dd className="font-medium text-ink">
                  {ti('aircraft.seats', { n: aircraft.seats })} · {aircraft.crewDescription}
                </dd>
              </div>
            </div>
            <div className="flex gap-2 rounded-lg bg-surface-0/80 px-3 py-2">
              <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {t('aircraft.engine')}
                </dt>
                <dd className="font-medium text-ink">{aircraft.engine}</dd>
                <dd className="text-xs text-ink-muted">
                  {ti('aircraft.cruise', {
                    kts: aircraft.cruiseSpeedKts,
                    ft: aircraft.serviceCeilingFt.toLocaleString(numLocale),
                  })}
                </dd>
              </div>
            </div>
            <div className="flex gap-2 rounded-lg bg-surface-0/80 px-3 py-2 sm:col-span-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {t('aircraft.category')}
                </dt>
                <dd className="font-medium text-ink">{aircraft.category}</dd>
                <dd className="text-xs text-ink-muted">{aircraft.roleSummary}</dd>
              </div>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {t('aircraft.rangeYear')}
              </dt>
              <dd className="text-sm font-medium text-ink">
                {ti('aircraft.rangeLine', {
                  nm: aircraft.maxRangeNm.toLocaleString(numLocale),
                  year: aircraft.year,
                })}
              </dd>
            </div>
          </dl>
        </div>
      </Card>
    </article>
  )
}
