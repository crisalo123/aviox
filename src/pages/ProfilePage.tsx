import { useEffect, useRef, useState, type FormEvent } from 'react'
import { UserRound } from 'lucide-react'
import { useAuth } from '@/features/auth/model/useAuth'
import { readFileAsDataUrl } from '@/features/documents/lib/readFileAsDataUrl'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'

const MAX_AVATAR_BYTES = 1024 * 1024

export function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { t, ti } = useLanguage()
  const fileRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(user?.displayName ?? '')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    setName(user.displayName)
  }, [user])

  if (!user) return null

  const maxMb = Math.round(MAX_AVATAR_BYTES / (1024 * 1024))

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    updateProfile({ displayName: name })
  }

  async function onPickAvatar(file: File | null) {
    setError(null)
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError(t('profile.errImage'))
      return
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setError(ti('profile.errSize', { mb: maxMb }))
      return
    }
    try {
      const avatarDataUrl = await readFileAsDataUrl(file)
      updateProfile({ avatarDataUrl })
    } catch {
      setError(t('profile.errRead'))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card title={t('profile.title')} description={t('profile.lead')} />

      <Card title={t('profile.photoTitle')} description={t('profile.photoDesc')}>
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-surface-2 bg-surface-0 shadow-inner">
            {user.avatarDataUrl ? (
              <img
                src={user.avatarDataUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound className="h-14 w-14 text-ink-muted" aria-hidden />
            )}
          </div>
          <div className="flex w-full min-w-0 flex-col gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(ev) => {
                const f = ev.target.files?.[0] ?? null
                void onPickAvatar(f)
                ev.target.value = ''
              }}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => fileRef.current?.click()}>
                {user.avatarDataUrl ? t('profile.changePhoto') : t('profile.addPhoto')}
              </Button>
              {user.avatarDataUrl ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-700 hover:bg-red-50"
                  onClick={() => updateProfile({ avatarDataUrl: '' })}
                >
                  {t('profile.removePhoto')}
                </Button>
              ) : null}
            </div>
            <p className="text-xs text-ink-muted">{ti('profile.photoHelp', { mb: maxMb })}</p>
          </div>
        </div>
      </Card>

      <Card title={t('profile.nameTitle')} description={t('profile.nameDesc')}>
        <form className="mt-4 flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            label={t('profile.displayName')}
            name="displayName"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            autoComplete="name"
          />
          {error ? (
            <p className="text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit">{t('profile.saveName')}</Button>
        </form>
      </Card>
    </div>
  )
}
