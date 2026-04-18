import { GraduationCap } from 'lucide-react'
import { MOCK_STUDENT_ROWS } from '@/features/tutor/model/mockStudents'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Card } from '@/shared/ui/Card'

export function ProgressView() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-4">
      <Card title={t('progress.title')} description={t('progress.desc')} />

      <div className="overflow-x-auto rounded-xl border border-surface-2 bg-surface-1 shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-surface-2 bg-surface-0 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t('progress.col.student')}</th>
              <th className="px-4 py-3 font-medium">{t('progress.col.phase')}</th>
              <th className="px-4 py-3 font-medium">{t('progress.col.hours')}</th>
              <th className="px-4 py-3 font-medium">{t('progress.col.landings')}</th>
              <th className="px-4 py-3 font-medium">{t('progress.col.last')}</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STUDENT_ROWS.map((row) => (
              <tr key={row.id} className="border-b border-surface-2 last:border-0">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <GraduationCap className="h-4 w-4 text-brand" aria-hidden />
                    {row.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-muted">{row.phase}</td>
                <td className="px-4 py-3 tabular-nums">{row.flightHours} h</td>
                <td className="px-4 py-3 tabular-nums">{row.landings}</td>
                <td className="px-4 py-3 text-ink-muted">{row.lastSession}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
