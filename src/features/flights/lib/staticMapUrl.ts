import type { FlightRouteStage } from '@/entities/booking/model/types'

export interface StaticMapUrlOptions {
  /** Ej. "560x220" o "400x160" (máx. 640x640 por lado en API estándar). */
  size: string
  zoom: string
  /** 1 o 2 (retina). 1 reduce peso de imagen. */
  scale?: string
}

const DEFAULT_OPTS: StaticMapUrlOptions = {
  size: '560x220',
  zoom: '15',
  scale: '2',
}

const COMPACT_OPTS: StaticMapUrlOptions = {
  size: '400x160',
  zoom: '14',
  scale: '1',
}

export function staticMapUrlPresets() {
  return { default: DEFAULT_OPTS, compact: COMPACT_OPTS }
}

export function buildStaticMapUrl(
  points: FlightRouteStage[],
  apiKey: string,
  opts: Partial<StaticMapUrlOptions> = {},
): string | null {
  if (points.length === 0) return null
  const { size, zoom, scale } = { ...DEFAULT_OPTS, ...opts }
  const params = new URLSearchParams()
  const c = points[0]
  params.set('center', `${c.lat},${c.lng}`)
  params.set('zoom', zoom)
  params.set('size', size)
  params.set('scale', scale ?? '2')
  params.set('maptype', 'hybrid')
  const pathCoords = points.map((p) => `${p.lat},${p.lng}`).join('|')
  params.set('path', `color:0x2dd4bf|weight:4|${pathCoords}`)
  points.forEach((p, i) => {
    params.append(
      'markers',
      `color:0x0a5568|label:${String(i + 1)}|${p.lat},${p.lng}`,
    )
  })
  params.set('key', apiKey)
  return `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`
}
