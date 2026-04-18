export function addDays(date: Date, amount: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function formatSlotRange(startsAt: string, endsAt: string): string {
  const s = new Date(startsAt)
  const e = new Date(endsAt)
  return new Intl.DateTimeFormat('es', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(s)
    .concat(' — ')
    .concat(
      new Intl.DateTimeFormat('es', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(e),
    )
}
