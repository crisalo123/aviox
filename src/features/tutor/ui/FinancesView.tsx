import { Banknote, TrendingUp, Wallet } from 'lucide-react'
import { useMemo } from 'react'
import { useBookings } from '@/features/booking/model/useBookings'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Card } from '@/shared/ui/Card'

const LESSON_RATE_USD = 120

export function FinancesView() {
  const { bookings } = useBookings()
  const { locale, t, ti } = useLanguage()
  const numLocale = locale === 'en' ? 'en-US' : 'es-CO'

  const stats = useMemo(() => {
    const completed = bookings.filter((b) => b.status === 'completada')
    const pending = bookings.filter((b) => b.status === 'confirmada')
    const gross = completed.length * LESSON_RATE_USD
    const pendingIncome = pending.length * LESSON_RATE_USD
    return {
      completedCount: completed.length,
      pendingCount: pending.length,
      gross,
      pendingIncome,
      balance: gross * 0.92,
    }
  }, [bookings])

  return (
    <div className="flex flex-col gap-4">
      <Card
        title={t('finances.title')}
        description={ti('finances.desc', { rate: LESSON_RATE_USD })}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden />
            {t('finances.completed')}
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            {stats.completedCount}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            {ti('finances.recognized', {
              amount: stats.gross.toLocaleString(numLocale),
            })}
          </p>
        </article>

        <article className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Banknote className="h-4 w-4 text-amber-600" aria-hidden />
            {t('finances.pending')}
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            {stats.pendingCount}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            {ti('finances.estimated', {
              amount: stats.pendingIncome.toLocaleString(numLocale),
            })}
          </p>
        </article>

        <article className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Wallet className="h-4 w-4 text-brand" aria-hidden />
            {t('finances.net')}
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            USD {stats.balance.toLocaleString(numLocale, { maximumFractionDigits: 0 })}
          </p>
          <p className="mt-1 text-xs text-ink-muted">{t('finances.netNote')}</p>
        </article>
      </div>
    </div>
  )
}
