export type AttendanceChoice = 'show' | 'no_show'

interface AttendanceSegmentedControlProps {
  /** Base estable para ids de accesibilidad (p. ej. id de reserva). */
  name: string
  value: AttendanceChoice | null | undefined
  onChange: (value: AttendanceChoice | null) => void
  legend?: string
  /** Si no hay `legend` visible, texto para lectores de pantalla en el grupo. */
  groupAriaLabel?: string
  labels: {
    show: string
    noShow: string
    clear: string
  }
  className?: string
}

function segClass(active: boolean) {
  const base =
    'min-w-0 flex-1 rounded-lg px-2 py-2 text-center text-xs font-semibold leading-snug transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:px-3 sm:text-sm'
  if (active) {
    return `${base} bg-surface-1 text-ink shadow-sm ring-1 ring-surface-2`
  }
  return `${base} text-ink-muted hover:bg-surface-1/60 hover:text-ink`
}

/**
 * Control de estado en segmentos (tipo interruptor con varias posiciones): no usa checkbox ni radio visibles.
 */
export function AttendanceSegmentedControl({
  name,
  value,
  onChange,
  legend,
  groupAriaLabel,
  labels,
  className = '',
}: AttendanceSegmentedControlProps) {
  const legendId = legend ? `${name}-att-legend` : undefined
  const unset = value !== 'show' && value !== 'no_show'
  const radiogroupA11y = legendId
    ? ({ 'aria-labelledby': legendId } as const)
    : ({ 'aria-label': groupAriaLabel ?? labels.show } as const)

  return (
    <fieldset className={`min-w-0 border-0 p-0 ${className}`}>
      {legend ? (
        <legend id={legendId} className="mb-2 block text-sm font-semibold text-ink">
          {legend}
        </legend>
      ) : null}
      <div
        role="radiogroup"
        {...radiogroupA11y}
        className="flex w-full max-w-xl rounded-xl bg-surface-0 p-1 shadow-inner ring-1 ring-surface-2"
      >
        <button
          type="button"
          role="radio"
          aria-checked={value === 'show'}
          id={`${name}-att-yes`}
          className={segClass(value === 'show')}
          onClick={() => onChange('show')}
        >
          {labels.show}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={value === 'no_show'}
          id={`${name}-att-no`}
          className={segClass(value === 'no_show')}
          onClick={() => onChange('no_show')}
        >
          {labels.noShow}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={unset}
          id={`${name}-att-clear`}
          className={segClass(unset)}
          onClick={() => onChange(null)}
        >
          {labels.clear}
        </button>
      </div>
    </fieldset>
  )
}
