import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { AIRCRAFT_CATALOG } from '@/entities/aircraft/catalog/aircraftCatalog'
import type { AircraftOperationalStatus } from '@/entities/aircraft/model/opsStatus'

const STORAGE_KEY = 'ra_fleet_ops_v1'

export type FleetStatusMap = Record<string, AircraftOperationalStatus>

function defaultStatuses(): FleetStatusMap {
  return Object.fromEntries(
    AIRCRAFT_CATALOG.map((a) => [a.id, 'ground' as const]),
  ) as FleetStatusMap
}

function loadStatuses(): FleetStatusMap {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultStatuses()
    const parsed = JSON.parse(raw) as FleetStatusMap
    return { ...defaultStatuses(), ...parsed }
  } catch {
    return defaultStatuses()
  }
}

interface FleetOpsContextValue {
  statusById: FleetStatusMap
  setAircraftStatus: (aircraftId: string, status: AircraftOperationalStatus) => void
  getStatus: (aircraftId: string) => AircraftOperationalStatus
}

export const FleetOpsContext = createContext<FleetOpsContextValue | null>(null)

export function FleetOpsProvider({ children }: { children: ReactNode }) {
  const [statusById, setStatusById] = useState<FleetStatusMap>(loadStatuses)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(statusById))
  }, [statusById])

  const setAircraftStatus = useCallback(
    (aircraftId: string, status: AircraftOperationalStatus) => {
      setStatusById((prev) => ({ ...prev, [aircraftId]: status }))
    },
    [],
  )

  const getStatus = useCallback(
    (aircraftId: string): AircraftOperationalStatus =>
      statusById[aircraftId] ?? 'ground',
    [statusById],
  )

  const value = useMemo(
    () => ({
      statusById,
      setAircraftStatus,
      getStatus,
    }),
    [statusById, setAircraftStatus, getStatus],
  )

  return (
    <FleetOpsContext.Provider value={value}>{children}</FleetOpsContext.Provider>
  )
}
