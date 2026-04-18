import type { EventClickArg, EventInput } from '@fullcalendar/core'
import esLocale from '@fullcalendar/core/locales/es.js'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { AlertCircle, CalendarCheck2, CalendarDays, Sparkles } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAircraftById } from '@/entities/aircraft/catalog/aircraftCatalog'
import type { FlightSlot } from '@/entities/flight/model/types'
import { AircraftCard } from '@/features/aircraft/ui/AircraftCard'
import { useFleetOps } from '@/features/aircraft/model/useFleetOps'
import { useAuth } from '@/features/auth/model/useAuth'
import { useBookings } from '@/features/booking/model/useBookings'
import { MOCK_STUDENT_ROWS } from '@/features/tutor/model/mockStudents'
import { formatSlotRange } from '@/shared/lib/dates'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'

interface FlightScheduleViewProps {
  slots: FlightSlot[]
}

export function FlightScheduleView({ slots }: FlightScheduleViewProps) {
  const { user } = useAuth()
  const { getStatus } = useFleetOps()
  const { slotIsTaken, bookSlot } = useBookings()
  const [msg, setMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<FlightSlot | null>(null)
  const [simulateStudentId, setSimulateStudentId] = useState(
    () => MOCK_STUDENT_ROWS[0]?.id ?? '',
  )

  const canBook = user?.role === 'student'
  const isTutor = user?.role === 'tutor'
  const readOnly = user?.role === 'user'

  const events: EventInput[] = useMemo(
    () =>
      slots.map((slot) => {
        const taken = slotIsTaken(slot.id)
        return {
          id: slot.id,
          title: `${slot.aircraftLabel} · ${slot.zone.toUpperCase()}${taken ? ' · Ocupado' : ''}`,
          start: slot.startsAt,
          end: slot.endsAt,
          backgroundColor: taken ? '#6b8a96' : '#0a4d5c',
          borderColor: 'transparent',
          extendedProps: { slotId: slot.id, taken },
        }
      }),
    [slots, slotIsTaken],
  )

  const freeSlotsSoon = useMemo(() => {
    const free = slots.filter((s) => !slotIsTaken(s.id))
    return free
      .sort(
        (a, b) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
      )
      .slice(0, 10)
  }, [slots, slotIsTaken])

  const pickSlot = useCallback((slot: FlightSlot) => {
    setSelectedSlot(slot)
    setMsg(null)
    setSuccessMsg(null)
  }, [])

  function handleEventClick(click: EventClickArg) {
    const meta = click.event.extendedProps as { slotId?: string; taken?: boolean }
    const slotId = meta.slotId
    if (!slotId || !user) return
    const slot = slots.find((s) => s.id === slotId)
    if (!slot) return
    pickSlot(slot)
  }

  function confirmStudentBooking() {
    if (!user || !selectedSlot || !canBook) return
    setMsg(null)
    setSuccessMsg(null)
    const r = bookSlot(selectedSlot, user)
    if (r.ok) {
      setSuccessMsg('Listo: clase agendada. Revísala en Reservas.')
    } else {
      setMsg(r.message)
    }
  }

  function confirmTutorSimulation() {
    if (!user || !selectedSlot || !isTutor) return
    const row = MOCK_STUDENT_ROWS.find((s) => s.id === simulateStudentId)
    if (!row) {
      setMsg('Elige un alumno de la lista.')
      return
    }
    setMsg(null)
    setSuccessMsg(null)
    const r = bookSlot(selectedSlot, user, {
      simulateFor: { studentId: row.id, studentName: row.name },
    })
    if (r.ok) {
      setSuccessMsg(`Clase registrada para ${row.name}. Visible en Reservas.`)
    } else {
      setMsg(r.message)
    }
  }

  if (!user) return null

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Agenda de vuelos"
        description={
          readOnly
            ? 'Solo consulta: elige un bloque en el calendario para ver detalle.'
            : canBook
              ? '1) Toca un bloque azul en el calendario o un acceso rápido. 2) Pulsa «Confirmar reserva» abajo.'
              : isTutor
                ? 'Simula la agenda: elige bloque libre y registra clase para un alumno de ejemplo.'
                : 'Vista de ocupación de la flota.'
        }
      />

      <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm bg-brand" aria-hidden />
          Disponible — clic para seleccionar
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm bg-[#6b8a96]" aria-hidden />
          Ocupado
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          FullCalendar
        </span>
      </div>

      {!readOnly && freeSlotsSoon.length > 0 ? (
        <Card
          title="Agendar rápido"
          description="Huecos libres próximos: un clic elige el bloque; confirma abajo."
          className="border-accent/25 bg-surface-1/90"
        >
          <div className="flex flex-wrap gap-2">
            {freeSlotsSoon.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => pickSlot(slot)}
                className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                  selectedSlot?.id === slot.id
                    ? 'border-brand bg-brand text-white shadow-sm'
                    : 'border-surface-2 bg-surface-0 text-ink hover:border-brand/50'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                  {formatSlotRange(slot.startsAt, slot.endsAt)}
                </span>
                <span className="mt-0.5 block font-normal text-[0.65rem] opacity-90">
                  {slot.aircraftLabel}
                </span>
              </button>
            ))}
          </div>
        </Card>
      ) : null}

      {successMsg ? (
        <p
          className="flex items-center gap-2 rounded-lg border border-emerald-200/90 bg-emerald-50 px-3 py-2 text-sm text-emerald-950"
          role="status"
        >
          <CalendarCheck2 className="h-4 w-4 shrink-0" aria-hidden />
          {successMsg}
        </p>
      ) : null}

      {msg ? (
        <p
          className="flex items-center gap-2 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-sm text-amber-950"
          role="status"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {msg}
        </p>
      ) : null}

      <div className="fc-shell rounded-2xl border border-white/80 bg-white/75 p-2 shadow-inner shadow-slate-900/5 ring-1 ring-slate-900/[0.04] backdrop-blur-sm md:p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={esLocale}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth',
          }}
          buttonText={{
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
          }}
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          slotDuration="01:00:00"
          scrollTime="08:00:00"
          height="auto"
          contentHeight={640}
          firstDay={1}
          nowIndicator
          events={events}
          eventClick={handleEventClick}
        />
      </div>

      {selectedSlot ? (
        <Card
          title="Bloque seleccionado"
          description={formatSlotRange(selectedSlot.startsAt, selectedSlot.endsAt)}
          className="border-brand/25"
        >
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-ink-muted">Aeronave</dt>
              <dd className="font-medium text-ink">{selectedSlot.aircraftLabel}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Instructor</dt>
              <dd className="font-medium text-ink">{selectedSlot.instructorName}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Zona</dt>
              <dd className="font-medium text-ink">{selectedSlot.zone.toUpperCase()}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Estado</dt>
              <dd className="font-medium text-ink">
                {slotIsTaken(selectedSlot.id) ? 'Ocupado' : 'Libre'}
              </dd>
            </div>
          </dl>

          {(() => {
            const ac = getAircraftById(selectedSlot.aircraftId)
            if (!ac) return null
            return (
              <div className="mt-4 space-y-3 border-t border-surface-2 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Aeronave asignada a este bloque
                </p>
                <AircraftCard aircraft={ac} variant="compact" />
                <Link
                  to={`/flota#${ac.id}`}
                  className="inline-flex text-sm font-semibold text-brand underline-offset-2 hover:underline"
                >
                  Ver ficha completa y especificaciones
                </Link>
                {getStatus(selectedSlot.aircraftId) === 'in_flight' ? (
                  <p className="rounded-lg border border-sky-200/80 bg-sky-50/90 px-3 py-2 text-xs font-medium leading-snug text-sky-950">
                    En la simulación esta aeronave figura <strong>en vuelo</strong>. Sigue pudiendo
                    reservar bloques futuros en agenda; esto no sustituye disponibilidad real de la
                    escuela.
                  </p>
                ) : null}
              </div>
            )
          })()}

          {canBook && !slotIsTaken(selectedSlot.id) ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" onClick={confirmStudentBooking}>
                Confirmar reserva
              </Button>
              <Button type="button" variant="ghost" onClick={() => setSelectedSlot(null)}>
                Cancelar selección
              </Button>
            </div>
          ) : null}

          {isTutor && !slotIsTaken(selectedSlot.id) ? (
            <div className="mt-4 flex flex-col gap-3 border-t border-surface-2 pt-4">
              <p className="text-sm text-ink-muted">
                Simulación: registra esta franja como clase de un alumno de ejemplo.
              </p>
              <label className="flex max-w-md flex-col gap-1 text-sm">
                <span className="font-medium text-ink">Alumno</span>
                <select
                  className="rounded-lg border border-surface-2 bg-surface-1 px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
                  value={simulateStudentId}
                  onChange={(e) => setSimulateStudentId(e.target.value)}
                >
                  {MOCK_STUDENT_ROWS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="secondary" onClick={confirmTutorSimulation}>
                  Registrar clase simulada
                </Button>
                <Button type="button" variant="ghost" onClick={() => setSelectedSlot(null)}>
                  Cerrar
                </Button>
              </div>
            </div>
          ) : null}

          {readOnly ? (
            <p className="mt-3 text-sm text-ink-muted">
              Tu rol solo permite consultar el calendario.
            </p>
          ) : null}

          {(canBook || isTutor) && slotIsTaken(selectedSlot.id) ? (
            <p className="mt-4 text-sm text-ink-muted">
              Este bloque ya está ocupado. Elige otro en el calendario o en «Agendar rápido».
            </p>
          ) : null}
        </Card>
      ) : (
        <p className="rounded-lg border border-dashed border-surface-2 bg-surface-1 px-4 py-3 text-center text-sm text-ink-muted">
          {readOnly
            ? 'Toca un evento en el calendario para ver el detalle.'
            : 'Selecciona un bloque azul en el calendario o usa «Agendar rápido» para empezar.'}
        </p>
      )}
    </div>
  )
}
