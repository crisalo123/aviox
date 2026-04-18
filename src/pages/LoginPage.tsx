import { Navigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { useAuth } from '@/features/auth/model/useAuth'
import { APP_NAME } from '@/shared/config/brand'
import { useLanguage } from '@/shared/i18n/languageContext'
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher'
import { LogoMark } from '@/shared/ui/LogoMark'

export function LoginPage() {
  const { user } = useAuth()
  const { t } = useLanguage()

  if (user) {
    return <Navigate to="/inicio" replace />
  }

  return (
    <div className="ra-login-screen relative flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute right-3 top-3 z-20 sm:right-6 sm:top-6">
        <LanguageSwitcher variant="surface" />
      </div>
      <div className="ra-login-glow" aria-hidden />
      <div className="relative z-[1] mb-10 flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-300/25 to-cyan-900/30 p-3 text-teal-50 ring-1 ring-white/25 shadow-2xl shadow-black/40 md:h-20 md:w-20">
          <LogoMark size={52} className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" />
        </div>
        <h1 className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          {APP_NAME}
        </h1>
        <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-slate-400 md:text-lg">
          {t('brand.tagline')}
        </p>
      </div>
      <div className="relative z-[1] w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
