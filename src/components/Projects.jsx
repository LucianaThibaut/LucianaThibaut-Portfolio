import { useMemo, useRef, useState } from 'react'
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHead from './SectionHead'
import DraftFrame from './DraftFrame'
import PlanViewer from './PlanViewer'
import useReveal, { revealClass } from '../lib/useReveal'
import { proyectos } from '../data/portfolio'

const pad = n => String(n).padStart(2, '0')

// Un proyecto puede venir con `grupos` (especialidades con varias láminas)
// o con `laminas` sueltas; en ese caso cada lámina es su propio grupo.
function normalize(proyecto) {
  const grupos = proyecto.grupos ?? proyecto.laminas.map(l => ({
    id: l.id, titulo: l.titulo, descripcion: l.descripcion, specs: l.specs, laminas: [l],
  }))
  const hojas = grupos.flatMap((g, gi) => g.laminas.map((l, li) => ({
    ...l,
    gi, li,
    // Título para el visor: "Arquitectura · Planta baja" cuando hay grupos
    visor: proyecto.grupos ? `${g.titulo} · ${l.titulo}` : l.titulo,
  })))
  return { grupos, hojas, agrupado: Boolean(proyecto.grupos) }
}

function ProjectCase({ proyecto, index }) {
  const { grupos, hojas, agrupado } = useMemo(() => normalize(proyecto), [proyecto])
  const [active, setActive] = useState(0)
  const [viewer, setViewer] = useState(false)
  const [ref, visible] = useReveal(0.1)
  const tabsRef = useRef([])

  const hoja = hojas[active]
  const grupo = grupos[hoja.gi]
  const baseId = `p-${proyecto.id}`
  const firstOf = gi => hojas.findIndex(h => h.gi === gi)
  const meta = [...proyecto.meta, { l: 'Láminas', v: `${hojas.length} planos` }]

  const step = dir => setActive((active + dir + hojas.length) % hojas.length)

  // Flechas del teclado entre pestañas (patrón tablist)
  const onTabKey = e => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const gi = (hoja.gi + dir + grupos.length) % grupos.length
    setActive(firstOf(gi))
    tabsRef.current[gi]?.focus()
  }

  return (
    <article ref={ref} className={`case ${revealClass(visible)}`} aria-labelledby={`${baseId}-title`}>
      <header className="case-head">
        <DraftFrame className="case-frame">
          <p className="spread-num">Proyecto {pad(index + 1)}</p>
          <h3 id={`${baseId}-title`} className="spread-title">{proyecto.titulo}</h3>
        </DraftFrame>

        <div>
          <p className="case-summary">{proyecto.resumen}</p>
          <dl className="spread-meta">
            {meta.map(m => (
              <div key={m.l} className={m.full ? 'full' : undefined}><dt>{m.l}</dt><dd>{m.v}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      {/* Pestañas: especialidades o láminas */}
      <div
        className={`case-tabs${grupos.length > 4 ? ' is-many' : ''}`}
        role="tablist"
        aria-label={agrupado ? 'Especialidades del proyecto' : 'Láminas del proyecto'}
        onKeyDown={onTabKey}
      >
        {grupos.map((g, gi) => (
          <button
            key={g.id}
            ref={el => { tabsRef.current[gi] = el }}
            role="tab"
            id={`${baseId}-tab-${gi}`}
            aria-selected={gi === hoja.gi}
            aria-controls={`${baseId}-panel`}
            tabIndex={gi === hoja.gi ? 0 : -1}
            className={`case-tab${gi === hoja.gi ? ' is-active' : ''}`}
            onClick={() => setActive(firstOf(gi))}
          >
            <span className="case-tab-num">{pad(gi + 1)}</span>
            <span className="case-tab-name">
              {g.titulo}
              {agrupado && <small>{g.laminas.length} {g.laminas.length === 1 ? 'lámina' : 'láminas'}</small>}
            </span>
          </button>
        ))}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${hoja.gi}`}>
        {/* Descripción, arriba del plano */}
        <div className="sheet-info">
          <div>
            <p className="sheet-num">
              {agrupado
                ? `${grupo.titulo} · lámina ${hoja.li + 1} de ${grupo.laminas.length}`
                : `Lámina ${pad(active + 1)} de ${pad(hojas.length)}`}
            </p>
            <h4 className="sheet-title">{agrupado ? hoja.titulo : grupo.titulo}</h4>
            <p className="sheet-desc">{grupo.descripcion}</p>
            <ul className="chips">
              {grupo.specs.map(s => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
          <div className="sheet-actions">
            <button type="button" className="btn btn-primary" onClick={() => setViewer(true)}>
              <Maximize2 size={17} aria-hidden="true" /> Ver en detalle
            </button>
            <div className="sheet-steps">
              <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Lámina anterior"><ChevronLeft size={20} /></button>
              <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Lámina siguiente"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        {/* Láminas del grupo (solo si hay más de una) */}
        {grupo.laminas.length > 1 && (
          <div className="sheet-picker" role="group" aria-label={`Láminas de ${grupo.titulo}`}>
            {grupo.laminas.map((l, li) => {
              const i = hojas.findIndex(h => h.gi === hoja.gi && h.li === li)
              return (
                <button
                  key={l.id}
                  type="button"
                  className={`sheet-pick${i === active ? ' is-active' : ''}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  {l.titulo}
                </button>
              )
            })}
          </div>
        )}

        {/* Plano: se toca para abrir el visor con zoom */}
        <button type="button" className="sheet" onClick={() => setViewer(true)} aria-label={`Ampliar plano: ${hoja.visor}`}>
          <img
            key={hoja.img}
            src={hoja.img}
            alt={`Plano: ${hoja.visor}`}
            width={hoja.w}
            height={hoja.h}
            loading="lazy"
            decoding="async"
          />
          <span className="sheet-zoom" aria-hidden="true"><Maximize2 size={16} /> Ampliar</span>
        </button>
      </div>

      {viewer && (
        <PlanViewer
          laminas={hojas.map(h => ({ ...h, titulo: h.visor }))}
          index={active}
          onIndex={setActive}
          onClose={() => setViewer(false)}
        />
      )}
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
        {proyectos.map((p, i) => <ProjectCase key={p.id} proyecto={p} index={i} />)}
      </div>
    </section>
  )
}
