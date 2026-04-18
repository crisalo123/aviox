import { MapPinned } from 'lucide-react'
import type { FlightRouteStage } from '@/entities/booking/model/types'
import {
  buildStaticMapUrl,
  staticMapUrlPresets,
} from '@/features/flights/lib/staticMapUrl'
import { CardinalRose } from '@/features/flights/ui/CardinalRose'
import { useLanguage } from '@/shared/i18n/languageContext'

export function FlightStagesStaticMap({
  stages,
  caption,
  variant = 'default',
  showCardinal = false,
}: {
  stages: FlightRouteStage[]
  caption?: string
  variant?: 'default' | 'compact'
  showCardinal?: boolean
}) {
  const { t } = useLanguage()
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()
  const mapOpts =
    variant === 'compact' ? staticMapUrlPresets().compact : staticMapUrlPresets().default
  const src = apiKey ? buildStaticMapUrl(stages, apiKey, mapOpts) : null

  if (!src) {
    return (
      <div className="overflow-hidden rounded-xl border border-surface-2 bg-surface-0">
        <div className="flex items-center gap-2 border-b border-surface-2 bg-surface-1 px-3 py-2 text-xs font-medium text-ink-muted">
          <MapPinned className="h-3.5 w-3.5 text-brand" aria-hidden />
          {t('documents.map.noKeyTitle')}
        </div>
        <ol className="list-decimal space-y-2 p-4 pl-8 text-sm text-ink">
          {stages.map((s, i) => (
            <li key={`${s.label}-${i}`}>
              <span className="font-medium text-ink">{s.label}</span>
              <span className="ml-2 text-xs text-ink-muted">
                {s.lat.toFixed(4)}, {s.lng.toFixed(4)}
              </span>
            </li>
          ))}
        </ol>
        <p className="border-t border-surface-2 px-3 py-2 text-[0.65rem] text-ink-muted">
          {t('documents.map.staticHint')}
        </p>
      </div>
    )
  }

  return (
    <figure className="space-y-2">
      <div className="relative overflow-hidden rounded-xl border border-surface-2 bg-surface-1 shadow-inner">
        <img
          src={src}
          alt={t('documents.map.alt')}
          className="h-auto w-full"
          loading="lazy"
          decoding="async"
        />
        {showCardinal ? (
          <CardinalRose className="absolute right-2 top-2" />
        ) : null}
      </div>
      {caption ? (
        <figcaption className="text-xs text-ink-muted">{caption}</figcaption>
      ) : null}
      <ol className="flex flex-wrap gap-2 text-[0.7rem] text-ink-muted">
        {stages.map((s, i) => (
          <li
            key={`${s.label}-${i}`}
            className="rounded-lg border border-surface-2 bg-surface-1 px-2 py-1"
          >
            <span className="font-semibold text-brand">{i + 1}.</span>{' '}
            {s.stageKey ? t(s.stageKey) : s.label}
          </li>
        ))}
      </ol>
    </figure>
  )
}
