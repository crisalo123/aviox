/**
 * Abre la búsqueda de vuelo en FlightAware con el identificador indicado
 * (matrícula, callsign o número de vuelo comercial).
 *
 * @see https://www.flightaware.com/
 */
export function flightAwareSearchUrl(ident: string): string {
  const q = ident.trim()
  if (!q) return 'https://www.flightaware.com/live/'
  return `https://www.flightaware.com/live/findflight/?ident=${encodeURIComponent(q)}`
}
