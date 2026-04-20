import { ClipboardList, UserRound } from 'lucide-react'
import { getAircraftById } from '@/entities/aircraft/catalog/aircraftCatalog'
import { useAuth } from '@/features/auth/model/useAuth'
import { useBookingAttendance } from '@/features/booking/model/useBookingAttendance'
import { useBookings } from '@/features/booking/model/useBookings'
import { formatSlotRange } from '@/shared/lib/dates'
import { useLanguage } from '@/shared/i18n/languageContext'
import { AttendanceSegmentedControl } from '@/shared/ui/AttendanceSegmentedControl'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'

export function ReservationsView() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { bookings, cancelBooking, completeBooking } = useBookings()
  const { getAttendance, setAttendance } = useBookingAttendance()

  if (!user) return null

  if (user.role === 'user') {
    return (
      <Card title={t('reservations.title')} description={t('reservations.noUserDesc')} />
    )
  }

  const list =
    user.role === 'tutor'
      ? bookings
      : bookings.filter((b) => b.studentId === user.id)

  const active = list.filter((b) => b.status !== 'cancelada')

  return (
    <div className="flex flex-col gap-4">
      <Card
        title={t('reservations.title')}
        description={
          user.role === 'tutor'
            ? `${t('reservations.descTutor')} ${t('reservations.attendanceLeadTutor')}`
            : t('reservations.descStudent')
        }
      />

      {active.length === 0 ? (
        <p className="rounded-lg border border-dashed border-surface-2 bg-surface-1 px-4 py-8 text-center text-sm text-ink-muted">
          {t('reservations.empty')}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {active.map((b) => {
            const ac = b.aircraftId ? getAircraftById(b.aircraftId) : undefined
            return (
            <li
              key={b.id}
              className="flex flex-col gap-3 rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div className="flex gap-3">
                {ac ? (
                  <img
                    src={ac.imageUrl}
                    alt=""
                    className="h-14 w-20 shrink-0 rounded-lg object-cover ring-1 ring-surface-2"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-surface-0 text-brand">
                    <ClipboardList className="h-5 w-5" aria-hidden />
                  </span>
                )}
                <div>
                  <p className="text-sm font-medium text-ink">
                    {formatSlotRange(b.startsAt, b.endsAt)}
                  </p>
                  <p className="text-sm text-ink-muted">
                    {b.aircraftLabel} · {t('common.zone')} {b.zone.toUpperCase()}
                  </p>
                  {user.role === 'tutor' ? (
                    <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
                      <UserRound className="h-3.5 w-3.5" aria-hidden />
                      {b.studentName}
                    </p>
                  ) : null}
                  <p className="mt-1 text-xs uppercase tracking-wide text-ink-muted">
                    {t('reservations.status')}: {t(`booking.status.${b.status}`)}
                  </p>
                  {user.role === 'tutor' ? (
                    <AttendanceSegmentedControl
                      className="mt-3"
                      name={`booking-attendance-${b.id}`}
                      value={getAttendance(b.id)}
                      onChange={(v) => setAttendance(b.id, v)}
                      legend={t('reservations.attendance.label')}
                      labels={{
                        show: t('reservations.attendance.show'),
                        noShow: t('reservations.attendance.noShow'),
                        clear: t('reservations.attendance.clear'),
                      }}
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.role === 'student' && b.status === 'confirmada' ? (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-700"
                    onClick={() => cancelBooking(b.id, user.id)}
                  >
                    {t('reservations.cancel')}
                  </Button>
                ) : null}
                {user.role === 'tutor' && b.status === 'confirmada' ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => completeBooking(b.id)}
                  >
                    {t('reservations.markComplete')}
                  </Button>
                ) : null}
              </div>
            </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
