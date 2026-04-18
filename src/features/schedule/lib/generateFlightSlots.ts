import { AIRCRAFT_CATALOG } from '@/entities/aircraft/catalog/aircraftCatalog'
import type { FlightSlot } from '@/entities/flight/model/types'
import { addDays, dateKey } from '@/shared/lib/dates'

const instructors = ['Capt. Morales', 'Capt. Ruiz', 'Capt. Vargas']

function pseudoSlotTaken(dayKey: string, hour: number): boolean {
  const n = (dayKey.charCodeAt(0) + hour) % 5
  return n === 0 || n === 2
}

export function generateFlightSlots(daysAhead = 6): FlightSlot[] {
  const slots: FlightSlot[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let d = 0; d < daysAhead; d += 1) {
    const day = addDays(today, d)
    const dk = dateKey(day)
    for (let h = 8; h <= 17; h += 1) {
      if (h === 12) continue
      const starts = new Date(day)
      starts.setHours(h, 0, 0, 0)
      const ends = new Date(starts)
      ends.setHours(h + 1, 0, 0, 0)
      if (pseudoSlotTaken(dk, h)) continue
      const id = `${dk}-h${h}`
      const ac = AIRCRAFT_CATALOG[(d + h) % AIRCRAFT_CATALOG.length]
      slots.push({
        id,
        startsAt: starts.toISOString(),
        endsAt: ends.toISOString(),
        instructorName: instructors[(d + h) % instructors.length],
        aircraftId: ac.id,
        aircraftLabel: ac.calendarLabel,
        zone: h % 2 === 0 ? 'alpha' : 'bravo',
      })
    }
  }
  return slots.sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )
}
