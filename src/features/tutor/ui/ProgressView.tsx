import { GraduationCap } from 'lucide-react'
import { MOCK_STUDENT_ROWS } from '@/features/tutor/model/mockStudents'
import { useStudentAttendance } from '@/features/tutor/model/useStudentAttendance'
import { useLanguage } from '@/shared/i18n/languageContext'
import { AttendanceSegmentedControl } from '@/shared/ui/AttendanceSegmentedControl'
import { Card } from '@/shared/ui/Card'

export function ProgressView() {
  const { t } = useLanguage()
  const { getAttendance, setAttendance } = useStudentAttendance()

  return (
    <div className="flex flex-col gap-4">
      <Card title={t('progress.title')} description={t('progress.desc')} />
      <p className="rounded-xl border border-brand/15 bg-brand/5 px-4 py-3 text-sm leading-relaxed text-ink">
        {t('progress.attendance.hint')}
      </p>

      <div className="overflow-x-auto rounded-xl border border-surface-2 bg-surface-1 shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-surface-2 bg-surface-0 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t('progress.col.student')}</th>
              <th className="px-4 py-3 font-medium">{t('progress.col.phase')}</th>
              <th className="px-4 py-3 font-medium">{t('progress.col.hours')}</th>
              <th className="px-4 py-3 font-medium">{t('progress.col.landings')}</th>
              <th className="px-4 py-3 font-medium">{t('progress.col.last')}</th>
              <th className="min-w-[220px] px-4 py-3 font-medium">{t('progress.col.attendance')}</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STUDENT_ROWS.map((row) => {
              const att = getAttendance(row.id)
              return (
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
                  <td className="px-4 py-3 align-top">
                    <AttendanceSegmentedControl
                      name={`progress-attendance-${row.id}`}
                      value={att}
                      onChange={(v) => setAttendance(row.id, v)}
                      groupAriaLabel={t('progress.col.attendance')}
                      labels={{
                        show: t('progress.attendance.show'),
                        noShow: t('progress.attendance.noShow'),
                        clear: t('progress.attendance.clear'),
                      }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
