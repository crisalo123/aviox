import { AIRCRAFT_CATALOG } from '@/entities/aircraft/catalog/aircraftCatalog'
import { AircraftCard } from '@/features/aircraft/ui/AircraftCard'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Card } from '@/shared/ui/Card'

export function AircraftFleetView() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-6">
      <Card title={t('fleetPage.title')} description={t('fleetPage.desc')} />

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
