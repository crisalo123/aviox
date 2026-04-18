import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import type { FlightBooking } from '@/entities/booking/model/types'
import type { FlightSlot } from '@/entities/flight/model/types'
import type { User } from '@/entities/user/model/types'

const STORAGE_KEY = 'ra_bookings_v2'

type BookOk = { ok: true }
type BookErr = { ok: false; message: string }
export type BookResult = BookOk | BookErr

/** Solo instructores: crea una reserva en nombre de un alumno (simulación). */
export interface BookSlotSimulateFor {
  studentId: string
  studentName: string
}

interface BookingState {
  bookings: FlightBooking[]
}

type Action =
  | { type: 'add'; payload: FlightBooking }
  | { type: 'cancel'; id: string; studentId: string }
  | { type: 'complete'; id: string }

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'add':
      return { bookings: [action.payload, ...state.bookings] }
    case 'cancel':
      return {
        bookings: state.bookings.map((b) =>
          b.id === action.id &&
          b.studentId === action.studentId &&
          b.status === 'confirmada'
            ? { ...b, status: 'cancelada' as const }
            : b,
        ),
      }
    case 'complete':
      return {
        bookings: state.bookings.map((b) =>
          b.id === action.id && b.status === 'confirmada'
            ? { ...b, status: 'completada' as const }
            : b,
        ),
      }
    default:
      return state
  }
}

function loadRaw(): FlightBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as FlightBooking[]
  } catch {
    return []
  }
}

function persist(bookings: FlightBooking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

interface BookingContextValue {
  bookings: FlightBooking[]
  slotIsTaken: (slotId: string) => boolean
  bookSlot: (
    slot: FlightSlot,
    actingUser: User,
    options?: { simulateFor?: BookSlotSimulateFor },
  ) => BookResult
  cancelBooking: (id: string, studentId: string) => void
  completeBooking: (id: string) => void
}

export const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    bookings: loadRaw(),
  }))

  useEffect(() => {
    persist(state.bookings)
  }, [state.bookings])

  const slotIsTaken = useCallback(
    (slotId: string) =>
      state.bookings.some(
        (b) => b.slotId === slotId && b.status === 'confirmada',
      ),
    [state.bookings],
  )

  const bookSlot = useCallback(
    (
      slot: FlightSlot,
      actingUser: User,
      options?: { simulateFor?: BookSlotSimulateFor },
    ): BookResult => {
      if (slotIsTaken(slot.id)) {
        return { ok: false, message: 'Este hueco ya está reservado.' }
      }

      const sim = options?.simulateFor
      if (sim) {
        if (actingUser.role !== 'tutor') {
          return {
            ok: false,
            message: 'Solo instructores pueden registrar una clase simulada para un alumno.',
          }
        }
        const booking: FlightBooking = {
          id: crypto.randomUUID(),
          slotId: slot.id,
          studentId: sim.studentId,
          studentName: sim.studentName,
          startsAt: slot.startsAt,
          endsAt: slot.endsAt,
          aircraftId: slot.aircraftId,
          aircraftLabel: slot.aircraftLabel,
          zone: slot.zone,
          status: 'confirmada',
          createdAt: new Date().toISOString(),
        }
        dispatch({ type: 'add', payload: booking })
        return { ok: true }
      }

      if (actingUser.role !== 'student') {
        return {
          ok: false,
          message:
            'Para tu propia reserva entra como estudiante, o elige un alumno si eres instructor.',
        }
      }

      const booking: FlightBooking = {
        id: crypto.randomUUID(),
        slotId: slot.id,
        studentId: actingUser.id,
        studentName: actingUser.displayName,
        startsAt: slot.startsAt,
        endsAt: slot.endsAt,
        aircraftId: slot.aircraftId,
        aircraftLabel: slot.aircraftLabel,
        zone: slot.zone,
        status: 'confirmada',
        createdAt: new Date().toISOString(),
      }
      dispatch({ type: 'add', payload: booking })
      return { ok: true }
    },
    [slotIsTaken],
  )

  const cancelBooking = useCallback((id: string, studentId: string) => {
    dispatch({ type: 'cancel', id, studentId })
  }, [])

  const completeBooking = useCallback((id: string) => {
    dispatch({ type: 'complete', id })
  }, [])

  const value = useMemo(
    () => ({
      bookings: state.bookings,
      slotIsTaken,
      bookSlot,
      cancelBooking,
      completeBooking,
    }),
    [
      state.bookings,
      slotIsTaken,
      bookSlot,
      cancelBooking,
      completeBooking,
    ],
  )

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}
