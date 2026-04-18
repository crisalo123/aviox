import { useMemo } from 'react'
import { generateFlightSlots } from '@/features/schedule/lib/generateFlightSlots'
import { FlightScheduleView } from '@/features/schedule/ui/FlightScheduleView'

export function SchedulePage() {
  const slots = useMemo(() => generateFlightSlots(), [])
  return <FlightScheduleView slots={slots} />
}
