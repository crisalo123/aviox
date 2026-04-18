import { AIRCRAFT_CATALOG } from '@/entities/aircraft/catalog/aircraftCatalog'
import { AircraftCard } from '@/features/aircraft/ui/AircraftCard'
import { Card } from '@/shared/ui/Card'

export function AircraftFleetView() {
  return (
    <div className="flex flex-col gap-6">
      <Card
        title="Flota disponible"
        description="Cada aeronave puede asignarse a bloques del horario. El estado «en vuelo / tierra / mantenimiento» es una simulación para el curso (se guarda en esta sesión del navegador). Los datos técnicos son orientativos: sustituye matrículas y cifras por los de tu operación."
      />

      <ul className="flex flex-col gap-8">
        {AIRCRAFT_CATALOG.map((ac) => (
          <li key={ac.id}>
            <AircraftCard aircraft={ac} />
          </li>
        ))}
      </ul>
    </div>
  )
}
