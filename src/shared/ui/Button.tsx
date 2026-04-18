import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variantClass: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-[#0c6b7e] via-brand to-[#052a35] text-white shadow-lg shadow-teal-950/25 ring-1 ring-white/10 hover:brightness-[1.07] active:brightness-[0.97] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/90 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 disabled:pointer-events-none disabled:opacity-45',
  secondary:
    'border border-surface-2/90 bg-surface-1 text-ink shadow-md shadow-ink/5 ring-1 ring-white/80 hover:border-brand/35 hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45',
  ghost:
    'text-ink-muted hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-offset-2 disabled:opacity-45',
  danger:
    'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md shadow-red-900/20 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/80 focus-visible:ring-offset-2 disabled:opacity-45',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition duration-200 ${variantClass[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
