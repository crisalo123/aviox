import { Globe } from 'lucide-react'
import type { Locale } from '@/shared/i18n/locales'
import { useLanguage } from '@/shared/i18n/languageContext'

type Variant = 'sidebar' | 'surface'

const pillBase =
  'rounded-lg px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1'

export function LanguageSwitcher({
  variant = 'sidebar',
  className = '',
}: {
  variant?: Variant
  className?: string
}) {
  const { locale, setLocale, t } = useLanguage()

  const activeSidebar = `${pillBase} bg-teal-400/20 text-white ring-1 ring-teal-300/50 shadow-inner`
  const idleSidebar = `${pillBase} text-slate-400 hover:bg-white/[0.07] hover:text-slate-100`

  const activeSurface = `${pillBase} bg-brand text-white shadow-md shadow-brand/25`
  const idleSurface = `${pillBase} text-ink-muted hover:bg-surface-0 hover:text-ink`

  function pill(code: Locale) {
    const active = variant === 'sidebar' ? activeSidebar : activeSurface
    const idle = variant === 'sidebar' ? idleSidebar : idleSurface
    return locale === code ? active : idle
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-2xl border p-1.5 shadow-sm ${className} ${
        variant === 'sidebar'
          ? 'border-white/10 bg-black/15 backdrop-blur-sm'
          : 'border-surface-2/80 bg-white/90 backdrop-blur-sm'
      }`}
      role="group"
      aria-label={t('language.label')}
    >
      <Globe
        className={`h-4 w-4 shrink-0 ${variant === 'sidebar' ? 'text-teal-200/90' : 'text-brand'}`}
        aria-hidden
      />
      <div className="flex gap-0.5">
        {(['es', 'en'] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={pill(code)}
            aria-pressed={locale === code}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  )
}
