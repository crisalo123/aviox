import type { FlightBooking, FlightRouteStage } from '@/entities/booking/model/types'
import type { FlightZone } from '@/entities/flight/model/types'
import { RUNWAY_MAP_CENTER } from '@/features/runway/config/mapCenter'

export type RouteStagePoint = FlightRouteStage

const STAGE_DEFS = [
  {
    label: 'Salida y tramo inicial',
    stageKey: 'track.stage.initial',
    maneuverKey: 'track.maneuver.departure',
    durationMin: 8,
  },
  {
    label: 'Tramo de crucero',
    stageKey: 'track.stage.cruise',
    maneuverKey: 'track.maneuver.cruise',
    durationMin: 12,
  },
  {
    label: 'Zona de circuito',
    stageKey: 'track.stage.pattern',
    maneuverKey: 'track.maneuver.pattern',
    durationMin: 14,
  },
  {
    label: 'Final y toma',
    stageKey: 'track.stage.final',
    maneuverKey: 'track.maneuver.approach',
    durationMin: 10,
  },
] as const

/** Puntos de referencia alrededor del aeródromo (simulación didáctica, no registro GPS real). */
export function buildSyntheticRouteStages(
  seedKey: string,
  zone: FlightZone,
): FlightRouteStage[] {
  const base = RUNWAY_MAP_CENTER
  const n =
    seedKey.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 7
  const sign = zone === 'alpha' ? 1 : -1
  const j = sign * (0.0014 + n * 1e-5)

  return [
    {
      lat: base.lat - 0.0011,
      lng: base.lng - 0.0022 * sign,
      ...STAGE_DEFS[0],
    },
    {
      lat: base.lat + 0.00125,
      lng: base.lng + 0.0004 * sign,
      ...STAGE_DEFS[1],
    },
    {
      lat: base.lat + 0.0009,
      lng: base.lng + j,
      ...STAGE_DEFS[2],
    },
    {
      lat: base.lat - 0.00055,
      lng: base.lng + 0.0016 * sign,
      ...STAGE_DEFS[3],
    },
  ]
}

export function getRouteStagesForDisplay(booking: FlightBooking): RouteStagePoint[] {
  if (booking.routeStages?.length) return booking.routeStages
  const zone: FlightZone = booking.zone === 'bravo' ? 'bravo' : 'alpha'
  return buildSyntheticRouteStages(booking.id, zone)
}
