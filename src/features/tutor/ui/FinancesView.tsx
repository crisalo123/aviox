import { Banknote, TrendingUp, Wallet } from 'lucide-react'
import { useMemo } from 'react'
import { useBookings } from '@/features/booking/model/useBookings'
import { Card } from '@/shared/ui/Card'

const LESSON_RATE_USD = 120

export function FinancesView() {
  const { bookings } = useBookings()

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
        title="Ganancias y saldo"
        description={`Tarifa de referencia: USD ${LESSON_RATE_USD} por clase completada (marca completadas en Reservas).`}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden />
            Clases completadas
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            {stats.completedCount}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Ingreso reconocido: USD {stats.gross.toLocaleString('es')}
          </p>
        </article>

        <article className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Banknote className="h-4 w-4 text-amber-600" aria-hidden />
            Por cobrar (agendadas)
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            {stats.pendingCount}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Estimado: USD {stats.pendingIncome.toLocaleString('es')}
          </p>
        </article>

        <article className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Wallet className="h-4 w-4 text-brand" aria-hidden />
            Saldo neto estimado
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            USD {stats.balance.toLocaleString('es', { maximumFractionDigits: 0 })}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Aprox. 92 % del bruto (impuestos/comisiones simuladas).
          </p>
        </article>
      </div>
    </div>
  )
}
