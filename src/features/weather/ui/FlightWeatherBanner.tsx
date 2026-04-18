import {
  AlertTriangle,
  Ban,
  CloudSun,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import { useFlightWeather } from '@/features/weather/model/useFlightWeather'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Button } from '@/shared/ui/Button'

const levelStyles = {
  favorable: {
    wrap: 'border-emerald-300/60 bg-gradient-to-r from-emerald-50/95 to-teal-50/80 text-emerald-950',
    badge: 'bg-emerald-600 text-white',
    icon: ShieldCheck,
  },
  marginal: {
    wrap: 'border-amber-300/70 bg-gradient-to-r from-amber-50/95 to-orange-50/70 text-amber-950',
    badge: 'bg-amber-600 text-white',
    icon: AlertTriangle,
  },
  adverso: {
    wrap: 'border-red-300/70 bg-gradient-to-r from-red-50/95 to-rose-50/75 text-red-950',
    badge: 'bg-red-700 text-white',
    icon: Ban,
  },
} as const

export function FlightWeatherBanner() {
  const { status, report, error, reload } = useFlightWeather()
  const { t } = useLanguage()

  if (status === 'loading' && !report) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-medium text-ink-muted shadow-md shadow-ink/5 backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <Loader2 className="h-5 w-5 shrink-0 animate-spin text-brand" aria-hidden />
        {t('weather.loading')}
      </div>
    )
  }

  if (status === 'error' && !report) {
    return (
      <div className="flex flex-col gap-2 rounded-2xl border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-900 shadow-md sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 font-medium">
          <CloudSun className="h-5 w-5 shrink-0" aria-hidden />
          {error}
        </span>
        <Button type="button" variant="secondary" className="shrink-0" onClick={() => void reload()}>
          <RefreshCw className="h-4 w-4" aria-hidden />
          {t('weather.retry')}
        </Button>
      </div>
    )
  }

  if (!report) return null

  const st = levelStyles[report.level]
  const Icon = st.icon

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border px-4 py-4 shadow-md backdrop-blur-sm sm:flex-row sm:items-start sm:justify-between ${st.wrap}`}
      role="region"
      aria-label={t('weather.aria')}
    >
      <div className="flex min-w-0 flex-1 gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm ${st.badge}`}
        >
          <Icon className="h-6 w-6 text-white" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] opacity-80">
            {t('weather.region')}
          </p>
          <h2 className="mt-0.5 text-base font-bold leading-snug tracking-tight">{report.titulo}</h2>
          <p className="mt-1.5 text-sm leading-relaxed opacity-95">{report.detalle}</p>
          <p className="mt-2 text-xs font-semibold">
            {report.vueloPracticaRecomendado ? (
              <span className="inline-flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                {t('weather.vfrYes')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-current">
                <Ban className="h-3.5 w-3.5" aria-hidden />
                {t('weather.vfrNo')}
              </span>
            )}
          </p>
          <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-wider opacity-70">
            {t('weather.source')} {report.observadoEn.replace('T', ' ')}{' '}
            {t('weather.approx')}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="shrink-0 self-start border-current/20 bg-white/60 hover:bg-white/90"
        onClick={() => void reload()}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <RefreshCw className="h-4 w-4" aria-hidden />
        )}
        {t('weather.update')}
      </Button>
    </div>
  )
}
