import { useContext } from 'react'
import { BookingContext } from '@/features/booking/model/bookingContext'

export function useBookings() {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBookings debe usarse dentro de BookingProvider')
  }
  return ctx
}
