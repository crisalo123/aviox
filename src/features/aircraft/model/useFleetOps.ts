import { useContext } from 'react'
import { FleetOpsContext } from '@/features/aircraft/model/fleetOpsContext'

export function useFleetOps() {
  const ctx = useContext(FleetOpsContext)
  if (!ctx) {
    throw new Error('useFleetOps debe usarse dentro de FleetOpsProvider')
  }
  return ctx
}
