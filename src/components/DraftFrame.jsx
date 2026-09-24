// Marco de dibujo técnico: las líneas se pasan de las esquinas,
// como un recuadro trazado sobre una lámina.
export default function DraftFrame({ children, className = '' }) {
  return (
    <div className={`draft ${className}`}>
      <span className="draft-line t" aria-hidden="true" />
      <span className="draft-line b" aria-hidden="true" />
      <span className="draft-line l" aria-hidden="true" />
      <span className="draft-line r" aria-hidden="true" />
      {children}
    </div>
  )
}
