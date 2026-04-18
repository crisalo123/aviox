export type FlightZone = 'alpha' | 'bravo'

export interface FlightSlot {
  id: string
  startsAt: string
  endsAt: string
  instructorName: string
  /** Id en `AIRCRAFT_CATALOG` */
  aircraftId: string
  /** Texto corto para calendario y listas */
  aircraftLabel: string
  zone: FlightZone
}
