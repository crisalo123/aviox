import {
  Camera,
  ExternalLink,
  Eye,
  FileText,
  ImageIcon,
  Link2,
  Trash2,
} from 'lucide-react'
import type { SchoolDocument } from '@/entities/document/model/types'
import { useMemo, useState, type FormEvent } from 'react'
import {
  MAX_DOCUMENT_UPLOAD_BYTES,
  readFileAsDataUrl,
} from '@/features/documents/lib/readFileAsDataUrl'
import { DocumentPreviewModal } from '@/features/documents/ui/DocumentPreviewModal'
import { useDocuments } from '@/features/documents/model/useDocuments'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'

export function DocumentsView() {
  const { documents, addDocument, removeDocument } = useDocuments()
  const { t, ti } = useLanguage()
  const [preview, setPreview] = useState<SchoolDocument | null>(null)
  const maxMb = Math.round(MAX_DOCUMENT_UPLOAD_BYTES / (1024 * 1024))

  const [refTitle, setRefTitle] = useState('')
  const [refDescription, setRefDescription] = useState('')
  const [refUrl, setRefUrl] = useState('')
  const [refError, setRefError] = useState<string | null>(null)

  const [upTitle, setUpTitle] = useState('')
  const [upAircraft, setUpAircraft] = useState('')
  const [upDescription, setUpDescription] = useState('')
  const [upFile, setUpFile] = useState<File | null>(null)
  const [upError, setUpError] = useState<string | null>(null)

  const { subidas, referencias } = useMemo(() => {
    const sub = documents.filter((d) => d.kind === 'subida')
    const ref = documents.filter((d) => d.kind === 'referencia')
    return { subidas: sub, referencias: ref }
  }, [documents])

  function onSubmitReferencia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setRefError(null)
    const title = refTitle.trim()
    if (!title) {
      setRefError(t('documents.ref.errTitle'))
      return
    }
    addDocument({
      kind: 'referencia',
      title,
      description: refDescription.trim() || undefined,
      url: refUrl.trim() || undefined,
    })
    setRefTitle('')
    setRefDescription('')
    setRefUrl('')
  }

  async function onSubmitSubida(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUpError(null)
    const title = upTitle.trim()
    if (!title) {
      setUpError(t('documents.upload.errTitle'))
      return
    }
    if (!upFile) {
      setUpError(t('documents.upload.errFile'))
      return
    }
    if (upFile.size > MAX_DOCUMENT_UPLOAD_BYTES) {
      setUpError(ti('documents.upload.errSize', { mb: maxMb }))
      return
    }
    try {
      const attachmentDataUrl = await readFileAsDataUrl(upFile)
      addDocument({
        kind: 'subida',
        title,
        description: upDescription.trim() || undefined,
        aircraftRef: upAircraft.trim() || undefined,
        attachmentDataUrl,
        attachmentMime: upFile.type || 'application/octet-stream',
        attachmentName: upFile.name,
      })
      setUpTitle('')
      setUpAircraft('')
      setUpDescription('')
      setUpFile(null)
    } catch {
      setUpError(t('documents.upload.errRead'))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card
        title={t('documents.page.title')}
        description={`${t('documents.page.lead')} ${t('documents.listHint')}`}
      />
      <DocumentPreviewModal document={preview} onClose={() => setPreview(null)} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title={t('documents.ref.title')}
          description={t('documents.ref.desc')}
          className="border-brand/10"
        >
          <form className="mt-4 flex flex-col gap-4" onSubmit={onSubmitReferencia}>
            <Input
              label={t('documents.field.title')}
              name="ref-title"
              value={refTitle}
              onChange={(ev) => setRefTitle(ev.target.value)}
              placeholder={t('documents.ref.titlePh')}
              required
            />
            <Input
              label={t('documents.field.url')}
              name="ref-url"
              type="text"
              inputMode="url"
              placeholder={t('documents.field.urlPh')}
              value={refUrl}
              onChange={(ev) => setRefUrl(ev.target.value)}
            />
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ref-desc"
                className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted"
              >
                {t('documents.field.note')}
              </label>
              <textarea
                id="ref-desc"
                name="ref-desc"
                rows={3}
                value={refDescription}
                onChange={(ev) => setRefDescription(ev.target.value)}
                className="rounded-xl border border-surface-2 bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-inner outline-none ring-brand/30 transition focus:border-brand focus:ring-2"
              />
            </div>
            {refError ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                {refError}
              </p>
            ) : null}
            <Button type="submit" className="w-full">
              <Link2 className="h-4 w-4" aria-hidden />
              {t('documents.ref.add')}
            </Button>
          </form>
        </Card>

        <Card
          title={t('documents.upload.title')}
          description={t('documents.upload.desc')}
          className="border-teal-500/15"
        >
          <form className="mt-4 flex flex-col gap-4" onSubmit={onSubmitSubida}>
            <Input
              label={t('documents.field.title')}
              name="up-title"
              value={upTitle}
              onChange={(ev) => setUpTitle(ev.target.value)}
              placeholder={t('documents.upload.titlePh')}
              required
            />
            <Input
              label={t('documents.upload.aircraft')}
              name="up-aircraft"
              value={upAircraft}
              onChange={(ev) => setUpAircraft(ev.target.value)}
              placeholder={t('documents.upload.aircraftPh')}
            />
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold tracking-wide text-ink">
                {t('documents.upload.file')}
              </span>
              <input
                name="up-file"
                type="file"
                accept="image/*,.pdf,application/pdf"
                capture="environment"
                className="text-sm text-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand/15"
                onChange={(ev) => {
                  setUpFile(ev.target.files?.[0] ?? null)
                  setUpError(null)
                }}
              />
              <p className="text-xs text-ink-muted">
                {ti('documents.upload.fileHelp', { mb: maxMb })}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="up-desc"
                className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted"
              >
                {t('documents.upload.note')}
              </label>
              <textarea
                id="up-desc"
                name="up-desc"
                rows={2}
                value={upDescription}
                onChange={(ev) => setUpDescription(ev.target.value)}
                className="rounded-xl border border-surface-2 bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-inner outline-none ring-brand/30 transition focus:border-brand focus:ring-2"
              />
            </div>
            {upError ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                {upError}
              </p>
            ) : null}
            <Button type="submit" className="w-full">
              <Camera className="h-4 w-4" aria-hidden />
              {t('documents.upload.save')}
            </Button>
          </form>
        </Card>
      </div>

      {documents.length === 0 ? (
        <p className="rounded-xl border border-dashed border-surface-2 bg-surface-1 px-4 py-10 text-center text-sm text-ink-muted">
          {t('documents.empty')}
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {subidas.length > 0 ? (
            <section className="space-y-3">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                <Camera className="h-4 w-4 text-brand" aria-hidden />
                {t('documents.section.uploads')}
              </h2>
              <ul className="flex flex-col gap-3">
                {subidas.map((d) => (
                  <DocumentRow
                    key={d.id}
                    d={d}
                    onOpenPreview={() => setPreview(d)}
                    onRemove={() => removeDocument(d.id)}
                  />
                ))}
              </ul>
            </section>
          ) : null}
          {referencias.length > 0 ? (
            <section className="space-y-3">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                <FileText className="h-4 w-4 text-brand" aria-hidden />
                {t('documents.section.refs')}
              </h2>
              <ul className="flex flex-col gap-3">
                {referencias.map((d) => (
                  <DocumentRow
                    key={d.id}
                    d={d}
                    onOpenPreview={() => setPreview(d)}
                    onRemove={() => removeDocument(d.id)}
                  />
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </div>
  )
}

function DocumentRow({
  d,
  onOpenPreview,
  onRemove,
}: {
  d: SchoolDocument
  onOpenPreview: () => void
  onRemove: () => void
}) {
  const { locale, t } = useLanguage()
  const isSubida = d.kind === 'subida'
  const isImage =
    d.attachmentMime?.startsWith('image/') && d.attachmentDataUrl
  const dateLocale = locale === 'en' ? 'en-US' : 'es-CO'

  return (
    <li className="flex flex-col gap-3 rounded-xl border border-surface-2 bg-surface-1 p-4 shadow-sm transition hover:border-brand/25 hover:shadow-md sm:flex-row sm:items-start sm:justify-between">
      <div
        className="flex min-w-0 flex-1 cursor-pointer gap-3 rounded-lg outline-none ring-brand/0 transition hover:ring-2 hover:ring-brand/15"
        onClick={() => onOpenPreview()}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${
            isSubida
              ? 'bg-teal-500/10 text-teal-800 ring-teal-500/20'
              : 'bg-brand/10 text-brand ring-brand/15'
          }`}
        >
          {isSubida ? (
            <ImageIcon className="h-5 w-5" aria-hidden />
          ) : (
            <FileText className="h-5 w-5" aria-hidden />
          )}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-ink">{d.title}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
                isSubida ? 'bg-teal-500/15 text-teal-900' : 'bg-surface-0 text-ink-muted'
              }`}
            >
              {isSubida ? t('documents.badge.upload') : t('documents.badge.ref')}
            </span>
          </div>
          {d.aircraftRef ? (
            <p className="mt-1 text-xs font-medium text-ink-muted">
              {t('documents.aircraftLabel')}: <span className="text-ink">{d.aircraftRef}</span>
            </p>
          ) : null}
          {d.description ? (
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{d.description}</p>
          ) : null}
          {d.url ? (
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              onClick={(ev) => ev.stopPropagation()}
            >
              {t('documents.openLink')}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : null}
          {isSubida && d.attachmentDataUrl ? (
            <div className="mt-3">
              {isImage ? (
                <img
                  src={d.attachmentDataUrl}
                  alt={d.title}
                  className="max-h-56 w-full max-w-md rounded-lg border border-surface-2 object-contain shadow-inner"
                />
              ) : (
                <a
                  href={d.attachmentDataUrl}
                  download={d.attachmentName ?? 'documento.pdf'}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                  onClick={(ev) => ev.stopPropagation()}
                >
                  {t('documents.download')}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              )}
            </div>
          ) : null}
          <p className="mt-2 text-[0.65rem] uppercase tracking-wider text-ink-muted">
            {new Date(d.createdAt).toLocaleString(dateLocale, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-2 self-start sm:flex-row sm:items-start">
        <Button
          type="button"
          variant="ghost"
          className="text-brand hover:bg-brand/5"
          onClick={(ev) => {
            ev.stopPropagation()
            onOpenPreview()
          }}
        >
          <Eye className="h-4 w-4" aria-hidden />
          {t('documents.view')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="text-red-700 hover:bg-red-50"
          onClick={(ev) => {
            ev.stopPropagation()
            onRemove()
          }}
        >
          <Trash2 className="h-4 w-4" aria-hidden />
          {t('common.remove')}
        </Button>
      </div>
    </li>
  )
}
