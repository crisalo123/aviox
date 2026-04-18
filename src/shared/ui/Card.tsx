import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  description?: string
  children?: ReactNode
  className?: string
}

export function Card({ title, description, children, className = '' }: CardProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-white/80 bg-white/88 p-6 shadow-[0_4px_24px_rgba(4,36,47,0.06),0_20px_48px_-20px_rgba(4,36,47,0.12)] ring-1 ring-slate-900/5 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/90 before:to-transparent before:content-[''] ${className}`}
    >
      {title ? (
        <header className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
          {description ? (
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{description}</p>
          ) : null}
        </header>
      ) : null}
      {children}
    </section>
  )
}
