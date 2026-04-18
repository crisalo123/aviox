import { MapPinned } from 'lucide-react'
import { GoogleRunwayMap } from '@/features/runway/ui/GoogleRunwayMap'
import { MapsEmbedFallback } from '@/features/runway/ui/MapsEmbedFallback'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Card } from '@/shared/ui/Card'

const ZONE_IDS = ['threshold', 'mid', 'final'] as const

export function RunwayMapView() {
  const { t } = useLanguage()
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()

  return (
    <div className="flex flex-col gap-4">
      <Card title={t('runway.card.title')} description={t('runway.card.desc')} />

      <div className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <MapPinned className="h-4 w-4 text-brand" aria-hidden />
          <span>{t('runway.toolbarHint')}</span>
        </div>

        {apiKey ? <GoogleRunwayMap apiKey={apiKey} /> : <MapsEmbedFallback />}

        {!apiKey ? (
          <p className="mt-3 text-xs text-ink-muted">{t('runway.tipEnv')}</p>
        ) : null}

        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {ZONE_IDS.map((id) => (
            <li
              key={id}
              className="rounded-lg border border-surface-2 bg-surface-0 px-3 py-2 text-xs text-ink-muted"
            >
              <span className="font-semibold text-ink">{t(`runway.zone.${id}.label`)}</span>
              <p className="mt-1">{t(`runway.zone.${id}.note`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
