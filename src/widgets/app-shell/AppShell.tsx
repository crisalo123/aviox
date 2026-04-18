import { Loader2, LogOut } from 'lucide-react'
import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/model/useAuth'
import { FlightWeatherBanner } from '@/features/weather/ui/FlightWeatherBanner'
import { APP_NAME } from '@/shared/config/brand'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Button } from '@/shared/ui/Button'
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher'
import { LogoMark } from '@/shared/ui/LogoMark'
import { navItemsForRole } from '@/widgets/app-shell/nav-items'

function navLinkClass({ isActive }: { isActive: boolean }) {
  const base =
    'flex items-center gap-3 rounded-xl border-l-2 py-2.5 pl-[10px] pr-3 text-sm font-semibold tracking-wide transition-all duration-200'
  if (isActive) {
    return `${base} border-teal-400 bg-gradient-to-r from-teal-400/20 to-cyan-500/10 text-white shadow-inner ring-1 ring-white/10`
  }
  return `${base} border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-slate-100`
}

export function AppShell() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  if (!user) return null

  const items = navItemsForRole(user.role, t)
  const roleLabel = t(`role.${user.role}`)

  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <aside className="relative flex shrink-0 flex-col border-b border-white/5 bg-gradient-to-b from-[#011920] via-[#042d38] to-[#063747] shadow-[12px_0_40px_-12px_rgba(0,0,0,0.35)] md:w-64 md:border-b-0 md:border-r">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(95,234,212,0.9) 0%, transparent 45%)',
          }}
        />
        <div className="relative flex items-center gap-3 border-b border-white/10 px-4 py-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/25 to-cyan-700/20 text-teal-100 ring-1 ring-white/15 shadow-lg shadow-black/20">
            <LogoMark size={26} className="text-teal-50" />
          </span>
          <div className="min-w-0 text-left">
            <p className="truncate text-base font-bold tracking-tight text-white">
              {APP_NAME}
            </p>
            <p className="truncate text-xs font-medium text-slate-400">
              {user.displayName}
            </p>
            <p className="truncate text-[0.65rem] font-medium uppercase tracking-wider text-teal-300/90">
              {roleLabel}
            </p>
          </div>
        </div>
        <nav className="relative flex flex-row gap-1 overflow-x-auto px-2 py-4 md:flex-col md:overflow-visible md:px-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navLinkClass}
              end={item.to === '/inicio'}
            >
              <item.icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="relative mt-auto hidden flex-col gap-3 p-3 md:flex">
          <LanguageSwitcher variant="sidebar" className="w-full justify-center" />
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-red-200"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4" aria-hidden />
            {t('shell.logout')}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-gradient-to-br from-[#eef4f7] via-[#e8f1f5] to-[#dfeaf0]">
        <header className="flex items-center justify-between gap-3 border-b border-white/60 bg-white/55 px-3 py-2.5 shadow-sm shadow-ink/5 backdrop-blur-md md:hidden">
          <p className="min-w-0 truncate text-sm font-semibold tracking-wide text-ink">
            {APP_NAME}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher variant="surface" />
            <Button
              type="button"
              variant="ghost"
              className="text-ink-muted hover:text-red-700"
              onClick={() => logout()}
              aria-label={t('shell.logout')}
            >
              <LogOut className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="mx-auto max-w-5xl space-y-6">
            <FlightWeatherBanner />
            <Suspense
              fallback={
                <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white/40 py-16 text-sm font-medium text-ink-muted backdrop-blur-sm">
                  <Loader2 className="h-9 w-9 animate-spin text-brand" aria-hidden />
                  {t('shell.loading')}
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
