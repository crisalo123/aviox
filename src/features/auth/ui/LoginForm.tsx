import { LogIn } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UserRole } from '@/entities/user/model/types'
import { ROLE_LABELS } from '@/entities/user/model/types'
import { useAuth } from '@/features/auth/model/useAuth'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { LogoMark } from '@/shared/ui/LogoMark'

const ROLES: UserRole[] = ['student', 'tutor', 'user']

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('piloto@aviox.aero')
  const [password, setPassword] = useState('••••••••')
  const [role, setRole] = useState<UserRole>('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError('Ingresa un correo.')
      return
    }
    setLoading(true)
    try {
      await login({ email, password, role })
      navigate('/inicio', { replace: true })
    } catch {
      setError('No se pudo iniciar sesión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      title="Iniciar sesión"
      description="Elige tu rol para acceder a la agenda, reservas y panel de instructor."
      className="mx-auto w-full max-w-md border-white/95 shadow-2xl shadow-black/20"
    >
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <div className="flex items-start gap-3 rounded-xl border border-brand/10 bg-gradient-to-br from-teal-500/[0.08] to-cyan-800/[0.06] px-3.5 py-3 text-sm leading-snug text-ink-muted">
          <LogoMark size={22} className="mt-0.5 shrink-0 text-brand" />
          <span>
            Acceso por rol: estudiante, instructor o visitante de consulta.
          </span>
        </div>

        <Input
          label="Correo"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          hint="En esta versión local la contraseña no se valida."
        />

        <div
          role="group"
          aria-labelledby="login-role-label"
          className="rounded-xl border border-surface-2/80 bg-white/50 p-4 shadow-inner shadow-ink/[0.02]"
        >
          <p
            id="login-role-label"
            className="px-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-muted"
          >
            Rol
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            {ROLES.map((r) => (
              <label
                key={r}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-brand/[0.06]"
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r)}
                />
                <span className="text-sm font-medium text-ink">{ROLE_LABELS[r]}</span>
              </label>
            ))}
          </div>
        </div>

        {error ? (
          <p
            className="rounded-xl border border-red-200/90 bg-red-50/95 px-3 py-2.5 text-sm font-medium text-red-800"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full">
          <LogIn className="h-4 w-4" aria-hidden />
          {loading ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </Card>
  )
}
