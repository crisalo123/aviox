/** Aeronave de la flota escuela / operación (datos orientativos para el demo). */
export interface Aircraft {
  id: string
  /** Nombre distintivo en operación */
  nickname: string
  model: string
  registration: string
  category: string
  /** Uso típico en la escuela */
  roleSummary: string
  seats: number
  crewDescription: string
  engine: string
  cruiseSpeedKts: number
  maxRangeNm: number
  serviceCeilingFt: number
  year: number
  description: string
  /** URL resuelta por Vite (import) */
  imageUrl: string
  /** Texto en tarjetas y calendario */
  calendarLabel: string
  availableForScheduling: boolean
}
