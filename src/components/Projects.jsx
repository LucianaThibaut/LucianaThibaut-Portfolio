import { useRef, useState } from 'react'
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHead from './SectionHead'
import DraftFrame from './DraftFrame'
import PlanViewer from './PlanViewer'
import useReveal, { revealClass } from '../lib/useReveal'
import { proyectos } from '../data/portfolio'

const pad = n => String(n).padStart(2, '0')

function ProjectCase({ proyecto }) {
  const [active, setActive] = useState(0)
  const [viewer, setViewer] = useState(false)
  const [ref, visible] = useReveal(0.1)
  const tabsRef = useRef([])
  const { laminas } = proyecto
  const lamina = laminas[active]
  const baseId = `p-${proyecto.id}`

  const select = i => setActive((i + laminas.length) % laminas.length)

  // Flechas del teclado entre pestañas (patrón tablist)
  const onTabKey = e => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (active + step + laminas.length) % laminas.length
    setActive(next)
    tabsRef.current[next]?.focus()
  }

  return (
    <article ref={ref} className={`case ${revealClass(visible)}`} aria-labelledby={`${baseId}-title`}>
      <header className="case-head">
        <DraftFrame className="case-frame">
          <h3 id={`${baseId}-title`} className="spread-title">{proyecto.titulo}</h3>
        </DraftFrame>

        <div>
          <p className="case-summary">{proyecto.resumen}</p>
          <dl className="spread-meta">
            <div><dt>Rol</dt><dd>{proyecto.rol}</dd></div>
            <div><dt>Láminas</dt><dd>{laminas.length} planos</dd></div>
            <div className="full"><dt>Materiales</dt><dd>{proyecto.materiales}</dd></div>
          </dl>
        </div>
      </header>

      {/* Pestañas de láminas */}
      <div className="case-tabs" role="tablist" aria-label="Láminas del proyecto" onKeyDown={onTabKey}>
        {laminas.map((l, i) => (
          <button
            key={l.id}
            ref={el => { tabsRef.current[i] = el }}
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={`case-tab${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="case-tab-num">{pad(i + 1)}</span>
            <span className="case-tab-name">{l.titulo}</span>
          </button>
        ))}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`}>
        {/* Descripción de la lámina, arriba del plano */}
        <div className="sheet-info">
          <div>
            <p className="sheet-num">Lámina {pad(active + 1)} de {pad(laminas.length)}</p>
            <h4 className="sheet-title">{lamina.titulo}</h4>
            <p className="sheet-desc">{lamina.descripcion}</p>
            <ul className="chips">
              {lamina.specs.map(s => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
          <div className="sheet-actions">
            <button type="button" className="btn btn-primary" onClick={() => setViewer(true)}>
              <Maximize2 size={17} aria-hidden="true" /> Ver en detalle
            </button>
            <div className="sheet-steps">
              <button type="button" className="icon-btn" onClick={() => select(active - 1)} aria-label="Lámina anterior"><ChevronLeft size={20} /></button>
              <button type="button" className="icon-btn" onClick={() => select(active + 1)} aria-label="Lámina siguiente"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        {/* Plano: se toca para abrir el visor con zoom */}
        <button type="button" className="sheet" onClick={() => setViewer(true)} aria-label={`Ampliar plano: ${lamina.titulo}`}>
          <img
            key={lamina.img}
            src={lamina.img}
            alt={`Plano: ${lamina.titulo}`}
            width={lamina.w}
            height={lamina.h}
            loading="lazy"
            decoding="async"
          />
          <span className="sheet-zoom" aria-hidden="true"><Maximize2 size={16} /> Ampliar</span>
        </button>
      </div>

      {viewer && <PlanViewer laminas={laminas} index={active} onIndex={setActive} onClose={() => setViewer(false)} />}
    </article>
  )
}

export default function Projects() {
  return (
    <section id="proyectos" className="section" aria-labelledby="proyectos-title">
      <div className="container">
        <SectionHead
          id="proyectos-title"
          num="02"
          kicker="Proyectos"
          title="Planos desarrollados."
          intro="Láminas reales de proyecto. Cada plano se puede ampliar para ver cotas, armaduras y detalles."
        />
        {proyectos.map(p => <ProjectCase key={p.id} proyecto={p} />)}
      </div>
    </section>
  )
}
