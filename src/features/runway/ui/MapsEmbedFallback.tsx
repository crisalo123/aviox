import { RUNWAY_MAP_CENTER } from '@/features/runway/config/mapCenter'

/** Vista incrustada de Google Maps sin clave de API (menos funciones que la API JS). */
export function MapsEmbedFallback() {
  const src = `https://www.google.com/maps?q=${RUNWAY_MAP_CENTER.lat},${RUNWAY_MAP_CENTER.lng}&z=17&hl=es&output=embed`

  return (
    <iframe
      title="Mapa de la zona de operación"
      src={src}
      className="h-[440px] w-full rounded-xl border-0 shadow-inner"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
