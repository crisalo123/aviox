export type BookingStatus = 'confirmada' | 'completada' | 'cancelada'

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
}
