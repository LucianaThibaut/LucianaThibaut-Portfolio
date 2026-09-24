// Marco de dibujo técnico: las líneas se pasan de las esquinas,
// como un recuadro trazado a mano alzada en una lámina.
export default function DraftFrame({ children, overshoot = 14, color = 'var(--ink)', style, className }) {
  const o = -overshoot
  const line = { position: 'absolute', background: color, pointerEvents: 'none' }
  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <span aria-hidden="true" style={{ ...line, top: 0, left: o, right: o, height: 1 }} />
      <span aria-hidden="true" style={{ ...line, bottom: 0, left: o, right: o, height: 1 }} />
      <span aria-hidden="true" style={{ ...line, left: 0, top: o, bottom: o, width: 1 }} />
      <span aria-hidden="true" style={{ ...line, right: 0, top: o, bottom: o, width: 1 }} />
      {children}
    </div>
  )
}
