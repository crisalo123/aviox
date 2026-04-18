import { Bell, ExternalLink, Plane } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FlightBooking } from '@/entities/booking/model/types'
import { useAuth } from '@/features/auth/model/useAuth'
import { getRouteStagesForDisplay } from '@/features/booking/lib/routeStages'
import { useBookings } from '@/features/booking/model/useBookings'
import { flightAwareSearchUrl } from '@/features/flights/lib/flightAwareUrl'
import { FlightStagesStaticMap } from '@/features/flights/ui/FlightStagesStaticMap'
import { formatSlotRange } from '@/shared/lib/dates'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'

function partitionBookings(bookings: FlightBooking[], userId: string, isTutor: boolean) {
  const now = Date.now()
  const list = isTutor ? bookings : bookings.filter((b) => b.studentId === userId)

  const upcoming = list
    .filter(
      (b) =>
        b.status === 'confirmada' && new Date(b.endsAt).getTime() >= now,
    )
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())

  const past = list
    .filter((b) => {
      if (b.status === 'completada' || b.status === 'cancelada') return true
      if (b.status === 'confirmada' && new Date(b.endsAt).getTime() < now) return true
      return false
    })
    .sort((a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime())

  return { upcoming, past }
}

function stageTitle(
  s: ReturnType<typeof getRouteStagesForDisplay>[number],
  t: (k: string) => string,
) {
  return s.stageKey ? t(s.stageKey) : s.label
}

function BookingFlightCard({
  booking,
  variant,
  identDraft,
  onIdentDraft,
  onSaveIdent,
}: {
  booking: FlightBooking
  variant: 'upcoming' | 'past'
  identDraft: string
  onIdentDraft: (v: string) => void
  onSaveIdent: () => void
}) {
  const { t, ti } = useLanguage()
  const stages = getRouteStagesForDisplay(booking)
  const totalEstMin = useMemo(
    () => stages.reduce((acc, s) => acc + (typeof s.durationMin === 'number' ? s.durationMin : 0), 0),
    [stages],
  )
  const resolvedIdent =
    booking.flightAwareIdent?.trim() || identDraft.trim()
  const faUrl = flightAwareSearchUrl(resolvedIdent)

  return (
    <li className="rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">
            {formatSlotRange(booking.startsAt, booking.endsAt)}
          </p>
          <p className="text-sm text-ink-muted">
            {booking.aircraftLabel} · {t('common.zone')}{' '}
            {String(booking.zone).toUpperCase()} · {booking.studentName}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-muted">
            {booking.status === 'confirmada' && variant === 'past'
              ? t('track.status.pastUnmarked')
              : `${t('track.status.label')}: ${t(`booking.status.${booking.status}`)}`}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          {t('track.maneuvers.title')}
        </p>
        <p className="text-xs leading-relaxed text-ink-muted">{t('track.maneuvers.lead')}</p>
        <ol className="space-y-2 rounded-xl border border-surface-2 bg-surface-0 p-3">
          {stages.map((s, i) => (
            <li
              key={`${booking.id}-st-${i}`}
              className="flex gap-3 border-b border-surface-2 pb-2 last:border-b-0 last:pb-0"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-xs font-bold text-brand">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-sm font-semibold text-ink">{stageTitle(s, t)}</p>
                {s.maneuverKey ? (
                  <p className="text-xs text-ink-muted">
                    <span className="font-medium text-ink/80">{t('track.maneuvers.kind')}: </span>
                    {t(s.maneuverKey)}
                  </p>
                ) : null}
                {typeof s.durationMin === 'number' ? (
                  <p className="text-[0.7rem] text-ink-muted">
                    {ti('track.durationEst', { m: s.durationMin })}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        {totalEstMin > 0 ? (
          <p className="text-xs font-medium text-ink-muted">
            {ti('track.totalDurationEst', { m: totalEstMin })}
          </p>
        ) : null}

        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          {t('track.zoneMap.title')}
        </p>
        <FlightStagesStaticMap
          stages={stages}
          variant="compact"
          showCardinal
          caption={
            booking.status === 'completada' && booking.routeStages?.length
              ? t('track.caption.saved')
              : booking.status === 'completada'
                ? t('track.caption.ref')
                : t('track.caption.preview')
          }
        />
      </div>

      <div className="mt-4 rounded-xl border border-surface-2 bg-surface-0 p-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          {t('track.fa.title')}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">{t('track.fa.help')}</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <Input
              label={t('track.fa.ident')}
              name={`fa-${booking.id}`}
              placeholder={t('track.fa.identPh')}
              value={identDraft}
              onChange={(ev) => onIdentDraft(ev.target.value)}
            />
          </div>
          <Button type="button" variant="secondary" onClick={onSaveIdent}>
            {t('common.save')}
          </Button>
        </div>
        <a
          href={faUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          {t('track.fa.link')}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </li>
  )
}

export function FlightTrackingView() {
  const { user } = useAuth()
  const { t, ti } = useLanguage()
  const { bookings, setBookingFlightAwareIdent } = useBookings()
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const { upcoming, past } = useMemo(() => {
    if (!user) return { upcoming: [], past: [] }
    return partitionBookings(
      bookings,
      user.id,
      user.role === 'tutor',
    )
  }, [bookings, user])

  if (!user) return null

  if (user.role === 'user') {
    return (
      <Card title={t('track.noAccess.title')} description={t('track.noAccess.desc')} />
    )
  }

  const upcomingSoon = upcoming.filter((b) => {
    const t = new Date(b.startsAt).getTime() - Date.now()
    return t > 0 && t < 48 * 60 * 60 * 1000
  }).length

  return (
    <div className="flex flex-col gap-6">
      <Card title={t('track.main.title')} description={t('track.main.desc')} />

      {upcomingSoon > 0 ? (
        <div className="flex items-start gap-3 rounded-xl border border-teal-200/80 bg-teal-50/90 px-4 py-3 text-sm text-teal-950">
          <Bell className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            {upcomingSoon === 1
              ? t('track.reminderOne')
              : ti('track.reminderMany', { n: upcomingSoon })}
          </p>
        </div>
      ) : null}

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Plane className="h-5 w-5 text-brand" aria-hidden />
          {t('track.upcoming')}
        </h2>
        {upcoming.length === 0 ? (
          <p className="rounded-xl border border-dashed border-surface-2 bg-surface-1 px-4 py-8 text-center text-sm text-ink-muted">
            {t('track.upcoming.empty')}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {upcoming.map((b) => (
              <BookingFlightCard
                key={b.id}
                booking={b}
                variant="upcoming"
                identDraft={
                  drafts[b.id] !== undefined
                    ? drafts[b.id]
                    : (b.flightAwareIdent ?? '')
                }
                onIdentDraft={(v) => setDrafts((d) => ({ ...d, [b.id]: v }))}
                onSaveIdent={() => {
                  const raw =
                    drafts[b.id] !== undefined
                      ? drafts[b.id]
                      : (b.flightAwareIdent ?? '')
                  const v = raw.trim()
                  setBookingFlightAwareIdent(b.id, v || undefined)
                }}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-ink">{t('track.past')}</h2>
        <p className="text-sm text-ink-muted">{t('track.past.lead')}</p>
        {past.length === 0 ? (
          <p className="rounded-xl border border-dashed border-surface-2 bg-surface-1 px-4 py-8 text-center text-sm text-ink-muted">
            {t('track.past.empty')}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {past.map((b) => (
              <BookingFlightCard
                key={b.id}
                booking={b}
                variant="past"
                identDraft={
                  drafts[b.id] !== undefined
                    ? drafts[b.id]
                    : (b.flightAwareIdent ?? '')
                }
                onIdentDraft={(v) => setDrafts((d) => ({ ...d, [b.id]: v }))}
                onSaveIdent={() => {
                  const raw =
                    drafts[b.id] !== undefined
                      ? drafts[b.id]
                      : (b.flightAwareIdent ?? '')
                  const v = raw.trim()
                  setBookingFlightAwareIdent(b.id, v || undefined)
                }}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
