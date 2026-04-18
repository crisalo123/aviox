/** Estado operativo simulado (demo — no enlazado a ADS-B real). */
export type AircraftOperationalStatus = 'ground' | 'in_flight' | 'maintenance'

export const OPS_STATUS_LABEL: Record<AircraftOperationalStatus, string> = {
  ground: 'En tierra',
  in_flight: 'En vuelo',
  maintenance: 'Mantenimiento',
}
