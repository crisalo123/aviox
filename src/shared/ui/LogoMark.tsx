/**
 * Isotipo Aviox: horizonte + trayectoria ascendente + punto de rumbo.
 * Usa `currentColor` para adaptarse al contexto (sidebar oscuro, tarjetas claras, etc.).
 */
export function LogoMark({
  className = '',
  size = 24,
}: {
  className?: string
  /** Tamaño en px (cuadrado) */
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Horizonte / pista (lectura suave) */}
      <line
        x1="7"
        y1="37.5"
        x2="41"
        y2="37.5"
        stroke="currentColor"
        strokeOpacity={0.38}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Trayectoria: curva de ascenso */}
      <path
        d="M9 37.5C14.5 37.2 18.5 24 26 16.5 30.5 11.5 36.5 9.2 41.5 8.5"
        stroke="currentColor"
        strokeWidth="2.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Punto de rumbo (waypoint) — anillo fino + núcleo */}
      <circle
        cx="41.5"
        cy="8.5"
        r="5.25"
        stroke="currentColor"
        strokeOpacity={0.35}
        strokeWidth="1.25"
      />
      <circle cx="41.5" cy="8.5" r="2.85" fill="currentColor" />
    </svg>
  )
}
