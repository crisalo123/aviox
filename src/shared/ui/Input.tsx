import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export function Input({ label, hint, id, className = '', ...rest }: InputProps) {
  const inputId = id ?? rest.name
  return (
    <label className="flex flex-col gap-1.5 text-left text-sm">
      <span className="font-semibold tracking-wide text-ink">{label}</span>
      <input
        id={inputId}
        className={`rounded-xl border border-surface-2/90 bg-white/95 px-3.5 py-2.5 text-ink shadow-inner shadow-ink/[0.03] outline-none transition placeholder:text-ink-muted/50 focus:border-brand/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(47,212,196,0.18)] ${className}`}
        {...rest}
      />
      {hint ? <span className="text-xs leading-snug text-ink-muted">{hint}</span> : null}
    </label>
  )
}
