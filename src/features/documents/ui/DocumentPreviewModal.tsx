import { ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import type { SchoolDocument } from '@/entities/document/model/types'
import { useLanguage } from '@/shared/i18n/languageContext'
import { Button } from '@/shared/ui/Button'

function isHttpUrl(s: string) {
  try {
    const u = new URL(s)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

function urlLooksImage(url: string) {
  const p = url.split('?')[0]?.toLowerCase() ?? ''
  return /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(p)
}

function urlLooksPdf(url: string) {
  const p = url.split('?')[0]?.toLowerCase() ?? ''
  return p.endsWith('.pdf') || url.toLowerCase().includes('application/pdf')
}

interface DocumentPreviewModalProps {
  document: SchoolDocument | null
  onClose: () => void
}

export function DocumentPreviewModal({ document: d, onClose }: DocumentPreviewModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (!d) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [d, onClose])

  if (!d) return null

  const isSubida = d.kind === 'subida'
  const mime = d.attachmentMime ?? ''
  const dataUrl = d.attachmentDataUrl
  const refUrl = d.url?.trim()

  const subidaImage = isSubida && mime.startsWith('image/') && dataUrl
  const subidaPdf =
    isSubida &&
    dataUrl &&
    (mime === 'application/pdf' || d.attachmentName?.toLowerCase().endsWith('.pdf'))

  const refImage = !isSubida && refUrl && isHttpUrl(refUrl) && urlLooksImage(refUrl)
  const refPdf = !isSubida && refUrl && isHttpUrl(refUrl) && urlLooksPdf(refUrl)
  const refIframe = !isSubida && refUrl && isHttpUrl(refUrl) && !refImage && !refPdf

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-3 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-preview-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-surface-2 bg-surface-1 shadow-2xl"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-surface-2 px-4 py-3">
          <div className="min-w-0">
            <h2 id="doc-preview-title" className="truncate text-lg font-bold text-ink">
              {d.title}
            </h2>
            {d.description ? (
              <p className="mt-1 text-sm text-ink-muted">{d.description}</p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            className="shrink-0 text-ink-muted hover:text-ink"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            <X className="h-5 w-5" aria-hidden />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-surface-0 p-4">
          {subidaImage ? (
            <img
              src={dataUrl}
              alt={d.title}
              className="mx-auto max-h-[min(75vh,800px)] w-full max-w-full object-contain"
            />
          ) : null}

          {subidaPdf ? (
            <iframe
              title={d.title}
              src={dataUrl}
              className="h-[min(75vh,800px)] w-full rounded-lg border border-surface-2 bg-white"
            />
          ) : null}

          {isSubida && dataUrl && !subidaImage && !subidaPdf ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <p className="text-sm text-ink-muted">{t('documents.preview.noInline')}</p>
              <a
                href={dataUrl}
                download={d.attachmentName ?? 'documento'}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                {t('documents.download')}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          ) : null}

          {!isSubida && refImage && refUrl ? (
            <img
              src={refUrl}
              alt={d.title}
              className="mx-auto max-h-[min(75vh,800px)] w-full max-w-full object-contain"
            />
          ) : null}

          {!isSubida && refPdf && refUrl ? (
            <iframe
              title={d.title}
              src={refUrl}
              className="h-[min(75vh,800px)] w-full rounded-lg border border-surface-2 bg-white"
            />
          ) : null}

          {!isSubida && refUrl && isHttpUrl(refUrl) && refIframe ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-ink-muted">{t('documents.preview.embedNote')}</p>
              <iframe
                title={d.title}
                src={refUrl}
                className="h-[min(60vh,640px)] w-full rounded-lg border border-surface-2 bg-white"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          ) : null}

          {!isSubida && refUrl && !isHttpUrl(refUrl) ? (
            <p className="py-4 text-center text-sm text-ink-muted">
              <a href={refUrl} className="font-semibold text-brand hover:underline">
                {t('documents.preview.openLink')}
              </a>
            </p>
          ) : null}

          {!isSubida && !refUrl ? (
            <p className="py-6 text-center text-sm text-ink-muted">{t('documents.preview.noUrl')}</p>
          ) : null}

          {!isSubida && refUrl && isHttpUrl(refUrl) ? (
            <p className="mt-4 text-center">
              <a
                href={refUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                {t('documents.preview.openTab')}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
