import { Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AIRCRAFT_CATALOG } from '@/entities/aircraft/catalog/aircraftCatalog'
import type { AircraftOperationalStatus } from '@/entities/aircraft/model/opsStatus'
import { useFleetOps } from '@/features/aircraft/model/useFleetOps'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Card } from '@/shared/ui/Card'

const dotClass: Record<AircraftOperationalStatus, string> = {
  ground: 'bg-emerald-500',
  in_flight: 'animate-pulse bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]',
  maintenance: 'bg-amber-500',
}

export function FleetOpsSummary() {
  const { getStatus } = useFleetOps()
  const { t, ti } = useLanguage()
  const inFlightCount = AIRCRAFT_CATALOG.filter(
    (a) => getStatus(a.id) === 'in_flight',
  ).length

  return (
    <Card className="border-brand/15 bg-gradient-to-br from-white/95 to-sky-50/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Activity className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-bold tracking-tight text-ink">{t('fleet.title')}</h2>
            <p className="mt-1 text-sm text-ink-muted">
              {t('fleet.lead')}{' '}
              {inFlightCount > 0 ? (
                <span className="font-semibold text-brand">
                  {inFlightCount === 1
                    ? t('fleet.oneFlying')
                    : ti('fleet.nFlying', { n: inFlightCount })}
                </span>
              ) : (
                <span className="font-semibold text-brand">{t('fleet.allGround')}</span>
              )}{' '}
              {t('fleet.sub')}
            </p>
          </div>
        </div>
        <Link
          to="/flota"
          className="shrink-0 text-sm font-semibold text-brand underline-offset-2 hover:underline"
        >
          {t('fleet.link')}
        </Link>
      </div>
      <ul className="mt-4 flex flex-col gap-2 border-t border-surface-2/80 pt-4">
        {AIRCRAFT_CATALOG.map((ac) => {
          const st = getStatus(ac.id)
          return (
            <li
              key={ac.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-white/60 px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass[st]}`}
                  aria-hidden
                />
                <span className="truncate font-medium text-ink">{ac.nickname}</span>
                <span className="truncate font-mono text-xs text-ink-muted">
                  {ac.registration}
                </span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-ink-muted">
                {t(`ops.${st}`)}
              </span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
