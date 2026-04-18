import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { RUNWAY_MAP_CENTER } from '@/features/runway/config/mapCenter'
import { useLanguage } from '@/shared/i18n/languageContext'

type LatLng = { lat: number; lng: number }

const containerStyle: CSSProperties = {
  width: '100%',
  height: '440px',
  borderRadius: '12px',
}

const MARKER_POSITIONS: { id: string; key: string; position: LatLng }[] = [
  {
    id: 'umbral',
    key: 'runway.marker.threshold',
    position: {
      lat: RUNWAY_MAP_CENTER.lat + 0.0014,
      lng: RUNWAY_MAP_CENTER.lng - 0.0018,
    },
  },
  {
    id: 'circuito',
    key: 'runway.marker.pattern',
    position: {
      lat: RUNWAY_MAP_CENTER.lat + 0.0002,
      lng: RUNWAY_MAP_CENTER.lng + 0.0004,
    },
  },
  {
    id: 'final',
    key: 'runway.marker.final',
    position: {
      lat: RUNWAY_MAP_CENTER.lat - 0.0012,
      lng: RUNWAY_MAP_CENTER.lng + 0.0016,
    },
  },
]

interface GoogleRunwayMapProps {
  apiKey: string
}

export function GoogleRunwayMap({ apiKey }: GoogleRunwayMapProps) {
  const { locale, t } = useLanguage()
  const markers = useMemo(
    () =>
      MARKER_POSITIONS.map((m) => ({
        ...m,
        title: t(m.key),
      })),
    [locale, t],
  )

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'aviox-maps',
    googleMapsApiKey: apiKey,
    language: locale === 'en' ? 'en' : 'es',
    region: locale === 'en' ? 'US' : 'CO',
  })

  if (loadError) {
    return (
      <div className="flex min-h-[440px] items-center justify-center rounded-xl border border-surface-2 bg-surface-1 px-4 text-center text-sm text-ink-muted">
        {t('runway.mapsLoadError')}
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-[440px] items-center justify-center rounded-xl border border-surface-2 bg-surface-1 text-sm text-ink-muted">
        {t('runway.mapsLoading')}
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ ...RUNWAY_MAP_CENTER }}
      zoom={16}
      mapTypeId="hybrid"
      options={{
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        rotateControl: false,
      }}
    >
      {markers.map((m) => (
        <Marker key={m.id} position={m.position} title={m.title} />
      ))}
    </GoogleMap>
  )
}
