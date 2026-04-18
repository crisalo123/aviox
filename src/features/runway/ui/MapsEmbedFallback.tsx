import { RUNWAY_MAP_CENTER } from '@/features/runway/config/mapCenter'
import { useLanguage } from '@/shared/i18n/languageContext'

/** Vista incrustada de Google Maps sin clave de API (menos funciones que la API JS). */
export function MapsEmbedFallback() {
  const { locale, t } = useLanguage()
  const hl = locale === 'en' ? 'en' : 'es'
  const src = `https://www.google.com/maps?q=${RUNWAY_MAP_CENTER.lat},${RUNWAY_MAP_CENTER.lng}&z=17&hl=${hl}&output=embed`

  return (
    <iframe
      title={t('runway.embedTitle')}
      src={src}
      className="h-[440px] w-full rounded-xl border-0 shadow-inner"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
