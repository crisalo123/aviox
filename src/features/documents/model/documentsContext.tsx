import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { AddSchoolDocumentInput, SchoolDocument } from '@/entities/document/model/types'

const STORAGE_KEY = 'aviox_documents_v2'
const LEGACY_KEY = 'aviox_documents_v1'

function normalizeDoc(raw: unknown): SchoolDocument {
  const d = raw as Partial<SchoolDocument>
  return {
    id: d.id ?? crypto.randomUUID(),
    kind: d.kind === 'subida' ? 'subida' : 'referencia',
    title: d.title ?? 'Sin título',
    description: d.description,
    url: d.url,
    aircraftRef: d.aircraftRef,
    attachmentDataUrl: d.attachmentDataUrl,
    attachmentMime: d.attachmentMime,
    attachmentName: d.attachmentName,
    createdAt: d.createdAt ?? new Date().toISOString(),
  }
}

function loadDocs(): SchoolDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const legacy = localStorage.getItem(LEGACY_KEY)
      if (legacy) {
        const parsed = JSON.parse(legacy) as unknown[]
        const migrated = parsed.map((row) =>
          normalizeDoc({ ...(row as object), kind: 'referencia' }),
        )
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
        localStorage.removeItem(LEGACY_KEY)
        return migrated
      }
      return []
    }
    const parsed = JSON.parse(raw) as unknown[]
    return parsed.map((row) => normalizeDoc(row))
  } catch {
    return []
  }
}

function persist(docs: SchoolDocument[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs))
}

interface DocumentsContextValue {
  documents: SchoolDocument[]
  addDocument: (input: AddSchoolDocumentInput) => void
  removeDocument: (id: string) => void
}

export const DocumentsContext = createContext<DocumentsContextValue | null>(null)

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<SchoolDocument[]>(loadDocs)

  useEffect(() => {
    persist(documents)
  }, [documents])

  const addDocument = useCallback((input: AddSchoolDocumentInput) => {
    const title = input.title.trim()
    if (!title) return

    if (input.kind === 'referencia') {
      const next: SchoolDocument = {
        id: crypto.randomUUID(),
        kind: 'referencia',
        title,
        description: input.description?.trim() || undefined,
        url: input.url?.trim() || undefined,
        createdAt: new Date().toISOString(),
      }
      setDocuments((prev) => [next, ...prev])
      return
    }

    if (!input.attachmentDataUrl) return
    const next: SchoolDocument = {
      id: crypto.randomUUID(),
      kind: 'subida',
      title,
      description: input.description?.trim() || undefined,
      aircraftRef: input.aircraftRef?.trim() || undefined,
      attachmentDataUrl: input.attachmentDataUrl,
      attachmentMime: input.attachmentMime,
      attachmentName: input.attachmentName?.trim() || undefined,
      createdAt: new Date().toISOString(),
    }
    setDocuments((prev) => [next, ...prev])
  }, [])

  const removeDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      documents,
      addDocument,
      removeDocument,
    }),
    [documents, addDocument, removeDocument],
  )

  return (
    <DocumentsContext.Provider value={value}>{children}</DocumentsContext.Provider>
  )
}
