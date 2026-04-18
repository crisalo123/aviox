/** Límite orientativo para guardar en localStorage (foto/PDF escaneado). */
export const MAX_DOCUMENT_UPLOAD_BYTES = 2 * 1024 * 1024

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Formato de lectura no soportado'))
    }
    reader.onerror = () => reject(reader.error ?? new Error('No se pudo leer el archivo'))
    reader.readAsDataURL(file)
  })
}
