export type DocumentKind = 'referencia' | 'subida'

export type AddSchoolDocumentInput =
  | {
      kind: 'referencia'
      title: string
      description?: string
      url?: string
    }
  | {
      kind: 'subida'
      title: string
      description?: string
      aircraftRef?: string
      attachmentDataUrl: string
      attachmentMime: string
      attachmentName?: string
    }

export interface SchoolDocument {
  id: string
  /** Referencia: listas, libros, videos (enlaces). Subida: foto/archivo que no está en la app. */
  kind: DocumentKind
  title: string
  description?: string
  /** Enlace a PDF, vídeo, artículo, etc. (tipo referencia). */
  url?: string
  /** Ej. matrícula o modelo cuando subes checklist del “avión X”. */
  aircraftRef?: string
  /** Imagen u otro archivo embebido (solo dispositivo; ver límite de tamaño). */
  attachmentDataUrl?: string
  attachmentMime?: string
  attachmentName?: string
  createdAt: string
}
