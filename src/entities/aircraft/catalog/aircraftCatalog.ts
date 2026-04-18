import type { Aircraft } from '@/entities/aircraft/model/types'
import avioneta1 from '@/assets/avioneta_1.jpg'
import avioneta2 from '@/assets/avioneta_2.avif'
import avioneta3 from '@/assets/avioneta_3.avif'

/**
 * Flota de ejemplo enlazada a tus fotos en `src/assets`.
 * avioneta_1: jet ejecutivo · avioneta_2 / 3: piston monomotor típicos de escuela (ajusta textos si cambias fotos).
 */
export const AIRCRAFT_CATALOG: readonly Aircraft[] = [
  {
    id: 'ac-citation-xls',
    nickname: 'Quetzal',
    model: 'Cessna Citation XLS',
    registration: 'HK-5128',
    category: 'Jet ejecutivo · bimotor turboéfan',
    roleSummary:
      'Traslados corporativos, check-outs avanzados y entrenamiento de cabina presurizada.',
    seats: 8,
    crewDescription: 'Mínimo 2 pilotos certificados tipo.',
    engine: '2 × Pratt & Whitney Canada PW545B',
    cruiseSpeedKts: 441,
    maxRangeNm: 1900,
    serviceCeilingFt: 45000,
    year: 2008,
    description:
      'Cabina presurizada, crucero alto y autonomía regional. Ideal para simular operación IFR de alto nivel y gestión de cabina ejecutiva.',
    imageUrl: avioneta1,
    calendarLabel: 'Citation XLS · HK-5128',
    availableForScheduling: true,
  },
  {
    id: 'ac-172s',
    nickname: 'Brisa',
    model: 'Cessna 172S Skyhawk SP',
    registration: 'HK-1842',
    category: 'Monomotor pistón · ala alta',
    roleSummary:
      'Horas PPL, habilitaciones VFR y circuitos de tráfico; muy estable para alumno.',
    seats: 4,
    crewDescription: 'Instructor + hasta 2 pasajeros / alumnos según peso y balance.',
    engine: 'Lycoming IO-360-L2A · 180 HP',
    cruiseSpeedKts: 124,
    maxRangeNm: 515,
    serviceCeilingFt: 14000,
    year: 2016,
    description:
      'Referencia mundial en escuela de vuelo. Panel G1000 o mixto según configuración; perfecta para PPL y horas iniciales.',
    imageUrl: avioneta2,
    calendarLabel: 'Cessna 172S · HK-1842',
    availableForScheduling: true,
  },
  {
    id: 'ac-pa28-181',
    nickname: 'Cóndor',
    model: 'Piper PA-28-181 Archer III',
    registration: 'HK-2901',
    category: 'Monomotor pistón · ala baja',
    roleSummary:
      'Navegación VFR, transiciones y tacto algo más “crisp” que un 172; buena transición a bimotor.',
    seats: 4,
    crewDescription: 'Instructor + hasta 2 pasajeros según W&B.',
    engine: 'Lycoming O-360-A4M · 180 HP',
    cruiseSpeedKts: 128,
    maxRangeNm: 522,
    serviceCeilingFt: 14000,
    year: 2014,
    description:
      'Tren fijo, ala baja y buena visibilidad lateral. Muy usada en fase de perfeccionamiento antes de avanzar a aeronaves más complejas.',
    imageUrl: avioneta3,
    calendarLabel: 'Archer III · HK-2901',
    availableForScheduling: true,
  },
] as const

export function getAircraftById(id: string): Aircraft | undefined {
  return AIRCRAFT_CATALOG.find((a) => a.id === id)
}
