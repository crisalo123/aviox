/** Resultado orientativo para vuelo de práctica (no sustituye briefing oficial). */
export type FlightWxLevel = 'favorable' | 'marginal' | 'adverso'

export interface FlightWeatherReport {
  level: FlightWxLevel
  /** Texto corto para la UI */
  titulo: string
  /** Detalle para el usuario */
  detalle: string
  /** Si el producto sugiere planear vuelo VFR de escuela con precaución habitual */
  vueloPracticaRecomendado: boolean
  temperaturaC: number
  vientoKmh: number
  codigoWmo: number
  observadoEn: string
}
