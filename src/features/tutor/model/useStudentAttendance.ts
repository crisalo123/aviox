import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'aviox_tutor_attendance_v1'

export type SessionAttendance = 'show' | 'no_show'

function load(): Record<string, SessionAttendance> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const out: Record<string, SessionAttendance> = {}
    for (const [id, v] of Object.entries(parsed)) {
      if (v === 'show' || v === 'no_show') out[id] = v
    }
    return out
  } catch {
    return {}
  }
}

function persist(next: Record<string, SessionAttendance>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function useStudentAttendance() {
  const [byStudentId, setByStudentId] = useState(load)

  useEffect(() => {
    persist(byStudentId)
  }, [byStudentId])

  const setAttendance = useCallback((studentId: string, value: SessionAttendance | null) => {
    setByStudentId((prev) => {
      const next = { ...prev }
      if (value === null) delete next[studentId]
      else next[studentId] = value
      return next
    })
  }, [])

  const getAttendance = useCallback(
    (studentId: string) => byStudentId[studentId],
    [byStudentId],
  )

  return { getAttendance, setAttendance }
}
