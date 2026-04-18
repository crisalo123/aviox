import type { FlightWeatherReport, FlightWxLevel } from '@/entities/weather/model/types'

/** Códigos WMO donde no conviene práctica básica (tormenta, fuerte precipitación, etc.). */
const CODIGOS_ADVERSOS = new Set([
  56, 57, 66, 67, 75, 76, 77, 82, 84, 86, 87, 88, 95, 96, 99,
])

/** Niebla, llovizna o lluvia ligera: solo con extra cuidado. */
const CODIGOS_MARGINALES = new Set([
  3, 45, 48, 51, 53, 55, 61, 63, 65, 80, 81,
])

function severidadPorCodigo(code: number): FlightWxLevel {
  if (CODIGOS_ADVERSOS.has(code)) return 'adverso'
  if (CODIGOS_MARGINALES.has(code)) return 'marginal'
  return 'favorable'
}

function severidadPorViento(vientoKmh: number): FlightWxLevel {
  if (vientoKmh >= 46) return 'adverso'
  if (vientoKmh >= 30) return 'marginal'
  return 'favorable'
}

function combinar(a: FlightWxLevel, b: FlightWxLevel): FlightWxLevel {
  const rank: Record<FlightWxLevel, number> = {
    favorable: 0,
    marginal: 1,
    adverso: 2,
  }
  return rank[a] >= rank[b] ? a : b
}

function mensajes(
  level: FlightWxLevel,
  temp: number,
  viento: number,
  code: number,
): Pick<FlightWeatherReport, 'titulo' | 'detalle' | 'vueloPracticaRecomendado'> {
  const base = `${Math.round(temp)} °C · viento ~${Math.round(viento)} km/h · código meteorológico ${code}.`
  switch (level) {
    case 'favorable':
      return {
        titulo: 'Clima favorable para vuelo',
        detalle: `${base} Condiciones alineadas con práctica VFR habitual. Confirma siempre con tu escuela y METAR/TAF oficiales.`,
        vueloPracticaRecomendado: true,
      }
    case 'marginal':
      return {
        titulo: 'Clima marginal — precaución',
        detalle: `${base} Puede operarse con criterio de instructor y límites de alumno. Revisa visibilidad y ventanas en pista.`,
        vueloPracticaRecomendado: false,
      }
    case 'adverso':
      return {
        titulo: 'Clima adverso — vuelo no recomendado',
        detalle: `${base} Mejor posponer o cancelar la sesión práctica salvo autorización explícita y briefing actualizado.`,
        vueloPracticaRecomendado: false,
      }
  }
}

export function buildFlightWeatherReport(input: {
  temperaturaC: number
  vientoKmh: number
  codigoWmo: number
  observadoEn: string
}): FlightWeatherReport {
  const porCielo = severidadPorCodigo(input.codigoWmo)
  const porViento = severidadPorViento(input.vientoKmh)
  const level = combinar(porCielo, porViento)
  const textos = mensajes(level, input.temperaturaC, input.vientoKmh, input.codigoWmo)
  return {
    level,
    ...textos,
    temperaturaC: input.temperaturaC,
    vientoKmh: input.vientoKmh,
    codigoWmo: input.codigoWmo,
    observadoEn: input.observadoEn,
  }
}
