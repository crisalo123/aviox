export interface StudentProgressRow {
  id: string
  name: string
  phase: string
  flightHours: number
  landings: number
  lastSession: string
}

export const MOCK_STUDENT_ROWS: StudentProgressRow[] = [
  {
    id: 's1',
    name: 'Ana Torres',
    phase: 'PPL · Circuitos',
    flightHours: 18.4,
    landings: 42,
    lastSession: 'Hace 3 días',
  },
  {
    id: 's2',
    name: 'Luis Méndez',
    phase: 'PPL · Navegación',
    flightHours: 32.1,
    landings: 68,
    lastSession: 'Hace 1 semana',
  },
  {
    id: 's3',
    name: 'Camila Rojas',
    phase: 'Habilitación nocturna',
    flightHours: 45,
    landings: 91,
    lastSession: 'Ayer',
  },
]
