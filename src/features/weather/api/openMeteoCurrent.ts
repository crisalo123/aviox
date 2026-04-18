import type { FlightWeatherReport } from '@/entities/weather/model/types'
import { buildFlightWeatherReport } from '@/features/weather/lib/flightWeatherDecision'

interface OpenMeteoCurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  time: string
  interval?: number
}

interface OpenMeteoResponse {
  current_weather?: OpenMeteoCurrentWeather
}

export async function fetchFlightWeatherSnapshot(
  lat: number,
  lon: number,
): Promise<FlightWeatherReport> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current_weather: 'true',
    timezone: 'America/Bogota',
  })
  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Open-Meteo HTTP ${res.status}`)
  }
  const data = (await res.json()) as OpenMeteoResponse
  const cw = data.current_weather
  if (!cw) {
    throw new Error('Respuesta sin current_weather')
  }
  return buildFlightWeatherReport({
    temperaturaC: cw.temperature,
    vientoKmh: cw.windspeed,
    codigoWmo: cw.weathercode,
    observadoEn: cw.time,
  })
}
