import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { interpolate, messages } from '@/shared/i18n/messages'
import type { Locale } from '@/shared/i18n/locales'
import { LOCALES } from '@/shared/i18n/locales'

const STORAGE_KEY = 'aviox_locale_v1'

function readLocale(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'en' || v === 'es') return v
  } catch {
    /* ignore */
  }
  if (
    typeof navigator !== 'undefined' &&
    navigator.language.toLowerCase().startsWith('en')
  ) {
    return 'en'
  }
  return 'es'
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (next: Locale) => void
  t: (key: string) => string
  /** Reemplaza `{nombre}` en la cadena del diccionario. */
  ti: (key: string, vars: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale)

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'es'
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    if (LOCALES.includes(next)) setLocaleState(next)
  }, [])

  const t = useCallback(
    (key: string) => {
      const pack = messages[locale]
      return pack[key] ?? messages.es[key] ?? key
    },
    [locale],
  )

  const ti = useCallback(
    (key: string, vars: Record<string, string | number>) => interpolate(t(key), vars),
    [t],
  )

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      ti,
    }),
    [locale, setLocale, t, ti],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider')
  }
  return ctx
}
