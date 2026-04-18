import { RequireTutor } from '@/processes/auth-guard/RequireTutor'
import { ProgressView } from '@/features/tutor/ui/ProgressView'

export function ProgressPage() {
  return (
    <RequireTutor>
      <ProgressView />
    </RequireTutor>
  )
}
