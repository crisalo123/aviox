import { useLanguage } from '@/shared/i18n/languageContext'

/** Rosa compacta N/E/S/W sobre el mapa (orientación, no brújula magnética). */
export function CardinalRose({ className = '' }: { className?: string }) {
  const { t } = useLanguage()
  return (
    <div
      className={`pointer-events-none select-none rounded-lg border border-white/40 bg-surface-0/85 px-1.5 py-1 shadow-sm backdrop-blur-sm ${className}`}
      role="img"
      aria-label={t('track.cardinal.title')}
    >
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <circle cx="28" cy="28" r="24" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.45" />
        <polygon points="28,6 32,22 28,18 24,22" fill="#0f766e" opacity="0.95" />
        <text x="28" y="13" textAnchor="middle" fill="#0d9488" fontSize="9" fontWeight="700">
          {t('track.cardinal.n')}
        </text>
        <text x="48" y="31" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
          {t('track.cardinal.e')}
        </text>
        <text x="28" y="52" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
          {t('track.cardinal.s')}
        </text>
        <text x="8" y="31" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
          {t('track.cardinal.w')}
        </text>
      </svg>
    </div>
  )
}
