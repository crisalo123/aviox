import { useEffect } from 'react'
import { AircraftFleetView } from '@/features/aircraft/ui/AircraftFleetView'

export function FleetPage() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '')
    if (!id) return
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [])

  return <AircraftFleetView />
}
