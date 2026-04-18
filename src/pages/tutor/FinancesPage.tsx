import { RequireTutor } from '@/processes/auth-guard/RequireTutor'
import { FinancesView } from '@/features/tutor/ui/FinancesView'

export function FinancesPage() {
  return (
    <RequireTutor>
      <FinancesView />
    </RequireTutor>
  )
}
