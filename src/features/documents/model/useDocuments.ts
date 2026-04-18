import { useContext } from 'react'
import { DocumentsContext } from '@/features/documents/model/documentsContext'

export function useDocuments() {
  const ctx = useContext(DocumentsContext)
  if (!ctx) {
    throw new Error('useDocuments debe usarse dentro de DocumentsProvider')
  }
  return ctx
}
