import { useCallback, useEffect, useState } from 'react'
import type { FlightWeatherReport } from '@/entities/weather/model/types'
import { fetchFlightWeatherSnapshot } from '@/features/weather/api/openMeteoCurrent'
import { RUNWAY_MAP_CENTER } from '@/features/runway/config/mapCenter'

type Status = 'idle' | 'loading' | 'ok' | 'error'

export function useFlightWeather() {
  const [status, setStatus] = useState<Status>('loading')
  const [report, setReport] = useState<FlightWeatherReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const next = await fetchFlightWeatherSnapshot(
        RUNWAY_MAP_CENTER.lat,
        RUNWAY_MAP_CENTER.lng,
      )
      setReport(next)
      setStatus('ok')
    } catch {
      setReport(null)
      setError('No se pudo cargar el clima. Revisa tu conexión e intenta de nuevo.')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      void load()
    })
  }, [load])

  return { status, report, error, reload: load }
}
