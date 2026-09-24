import { useState } from 'react'
import { ChevronDown, GraduationCap, Briefcase } from 'lucide-react'
import SectionHead from './SectionHead'
import useReveal, { revealClass } from '../lib/useReveal'
import { experiencia, formacion } from '../data/portfolio'

const tools = [
  { name: 'AutoCAD · Civil 3D',   tag: 'Planos, catastro y replanteo' },
  { name: 'EPANET · FlowMaster',  tag: 'Cálculo hidráulico' },
  { name: 'Robot · RAM Elements', tag: 'Cálculo estructural' },
  { name: 'Excel avanzado',       tag: 'Tablas dinámicas, macros/VBA' },
  { name: 'SharePoint · Teams',   tag: 'Gestión documental' },
]

function Job({ item, open, onToggle, index }) {
  const bodyId = `job-${index}`
  return (
    <li className={`job${open ? ' is-open' : ''}`}>
      <span className="job-dot" aria-hidden="true" />
      <div className="job-card">
        <button className="job-head" aria-expanded={open} aria-controls={bodyId} onClick={onToggle}>
          <span className="job-role">{item.cargo}</span>
          <span className="job-period">{item.periodo}</span>
          <span className="job-company">{item.empresa}</span>
          <ChevronDown className="job-toggle" size={20} aria-hidden="true" />
        </button>
        <div id={bodyId} className="job-body">
          <div>
            <div className="job-inner">
              <p className="job-area">{item.descripcion}</p>
              <ul className="job-list">
                {item.logros.map(l => <li key={l}>{l}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Experience() {
  const [open, setOpen] = useState(0)
  const [asideRef, asideVis] = useReveal()
  const [listRef, listVis] = useReveal(0.05)

  return (
    <section id="experiencia" className="section" aria-labelledby="experiencia-title">
      <div className="container">
        <SectionHead
          id="experiencia-title"
          num="04"
          kicker="Experiencia"
          title="Trayectoria profesional."
          intro="Cuatro organizaciones, del sector público al privado, siempre del lado de la documentación técnica."
        />

        <div className="exp-grid">
          <aside ref={asideRef} className={`exp-aside ${revealClass(asideVis)}`}>
            <div className="card">
              <p className="card-label"><Briefcase size={18} aria-hidden="true" /> Herramientas de trabajo</p>
              {tools.map(t => (
                <div key={t.name} className="tool-row">
                  <strong>{t.name}</strong>
                  <span>{t.tag}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <p className="card-label"><GraduationCap size={18} aria-hidden="true" /> Formación</p>
              <p className="edu-title">{formacion.titulo}</p>
              <p className="edu-sub">{formacion.institucion}</p>
              <p className="edu-sub">{formacion.periodo} · Promedio {formacion.promedio}</p>
            </div>
          </aside>

          <ol ref={listRef} className={`timeline ${revealClass(listVis)}`}>
            {experiencia.map((item, i) => (
              <Job
                key={item.empresa}
                item={item}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
