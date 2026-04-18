export type BookingStatus = 'confirmada' | 'completada' | 'cancelada'

/** Punto de una etapa del vuelo (referencia didáctica / mapa resumido). */
export interface FlightRouteStage {
  lat: number
  lng: number
  /** Texto legible si no hay claves i18n (p. ej. datos antiguos en localStorage). */
  label: string
  /** Clave `messages` para el nombre de la etapa (p. ej. track.stage.initial). */
  stageKey?: string
  /** Clave `messages` para la maniobra asociada al tramo. */
  maneuverKey?: string
  /** Minutos orientativos del tramo para debrief (no es registro ADS-B). */
  durationMin?: number
}

export interface FlightBooking {
  id: string
  slotId: string
  studentId: string
  studentName: string
  startsAt: string
  endsAt: string
  /** Id de aeronave en catálogo (reservas antiguas pueden no tenerlo) */
  aircraftId?: string
  aircraftLabel: string
  zone: string
  status: BookingStatus
  createdAt: string
  /** Etapas guardadas al completar el vuelo (mapa resumido). */
  routeStages?: FlightRouteStage[]
  /** Matrícula, callsign o número de vuelo para abrir FlightAware. */
  flightAwareIdent?: string
}
