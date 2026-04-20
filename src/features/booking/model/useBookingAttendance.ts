import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'aviox_booking_attendance_v1'

export type BookingAttendance = 'show' | 'no_show'

function load(): Record<string, BookingAttendance> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const out: Record<string, BookingAttendance> = {}
    for (const [id, v] of Object.entries(parsed)) {
      if (v === 'show' || v === 'no_show') out[id] = v
    }
    return out
  } catch {
    return {}
  }
}

function persist(next: Record<string, BookingAttendance>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function useBookingAttendance() {
  const [byBookingId, setByBookingId] = useState(load)

  useEffect(() => {
    persist(byBookingId)
  }, [byBookingId])

  const setAttendance = useCallback((bookingId: string, value: BookingAttendance | null) => {
    setByBookingId((prev) => {
      const next = { ...prev }
      if (value === null) delete next[bookingId]
      else next[bookingId] = value
      return next
    })
  }, [])

  const getAttendance = useCallback(
    (bookingId: string) => byBookingId[bookingId],
    [byBookingId],
  )

  return { getAttendance, setAttendance }
}
