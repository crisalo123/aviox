import { MapPinned } from 'lucide-react'
import { APP_NAME } from '@/shared/config/brand'
import { Card } from '@/shared/ui/Card'
import { GoogleRunwayMap } from '@/features/runway/ui/GoogleRunwayMap'
import { MapsEmbedFallback } from '@/features/runway/ui/MapsEmbedFallback'

const ZONES = [
  { id: 'threshold', label: 'Umbral', note: 'Despegue, toque y puesta en potencia.' },
  { id: 'mid', label: 'Tramo central', note: 'Circuito de tráfico y referencias visuales.' },
  { id: 'final', label: 'Final', note: 'Aproximación y alineación con la pista.' },
] as const

export function RunwayMapView() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Mapa operativo"
        description={`Vista satélite / híbrida estilo Google Maps para orientar la pista y puntos de práctica en ${APP_NAME}.`}
      />

      <div className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <MapPinned className="h-4 w-4 text-brand" aria-hidden />
          <span>
            Marcadores de referencia sobre la cartografía. Con clave de API obtienes controles
            completos de Google Maps.
          </span>
        </div>

        {apiKey ? <GoogleRunwayMap apiKey={apiKey} /> : <MapsEmbedFallback />}

        {!apiKey ? (
          <p className="mt-3 text-xs text-ink-muted">
            Tip: añade{' '}
            <code className="rounded bg-surface-0 px-1 py-0.5 text-ink">VITE_GOOGLE_MAPS_API_KEY</code>{' '}
            en un archivo <code className="rounded bg-surface-0 px-1 py-0.5 text-ink">.env</code> para
            activar la API de JavaScript (satélite, gestos y capas avanzadas). Copia{' '}
            <code className="rounded bg-surface-0 px-1 py-0.5 text-ink">.env.example</code>.
          </p>
        ) : null}

        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {ZONES.map((z) => (
            <li
              key={z.id}
              className="rounded-lg border border-surface-2 bg-surface-0 px-3 py-2 text-xs text-ink-muted"
            >
              <span className="font-semibold text-ink">{z.label}</span>
              <p className="mt-1">{z.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
