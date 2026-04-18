import { LogIn } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  INVALID_LOGIN_ERROR,
} from '@/features/auth/model/authContext'
import { useAuth } from '@/features/auth/model/useAuth'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'

export function LoginForm() {
  const { login } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError(t('login.error.email'))
      return
    }
    setLoading(true)
    try {
      await login({ email, password })
      navigate('/inicio', { replace: true })
    } catch (err) {
      if (err instanceof Error && err.message === INVALID_LOGIN_ERROR) {
        setError(t('login.error.badCreds'))
      } else {
        setError(t('login.error.generic'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      title={t('login.title')}
      description={t('login.desc')}
      className="mx-auto w-full max-w-md border-white/95 shadow-2xl shadow-black/20"
    >
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <Input
          label={t('login.email')}
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Input
          label={t('login.password')}
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

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
          {loading ? t('login.submitting') : t('login.submit')}
        </Button>
      </form>
    </Card>
  )
}
