import { Languages, Car, Plane } from 'lucide-react'
import SectionHead from './SectionHead'
import useReveal, { revealClass } from '../lib/useReveal'
import { personal, herramientas, formacion, datos } from '../data/portfolio'

const facts = [
  { l: 'Especialidad', v: 'Gestión documental' },
  { l: 'Título',       v: `${formacion.titulo}, UNLaM` },
  { l: 'Promedio',     v: formacion.promedio },
  { l: 'Experiencia',  v: 'Sector público y privado' },
]

const extraIcons = { 'Inglés': Languages, 'Licencia de conducir': Car, 'Disponibilidad para viajar': Plane }

export default function About() {
  const [leftRef, leftVis] = useReveal()
  const [rightRef, rightVis] = useReveal()

  return (
    <section id="perfil" className="section" aria-labelledby="perfil-title">
      <div className="container">
        <SectionHead
          id="perfil-title"
          num="01"
          kicker="Perfil profesional"
          title="Orden y precisión en cada documento de obra."
        />

        <div className="about-grid">
          <div ref={leftRef} className={revealClass(leftVis)}>
            <p className="about-text">{personal.resumen}</p>

            <dl className="facts">
              {facts.map(({ l, v }) => (
                <div key={l} className="fact"><dt>{l}</dt><dd>{v}</dd></div>
              ))}
            </dl>

            <ul className="extras">
              {datos.map(({ l, v }) => {
                const Icon = extraIcons[l]
                return (
                  <li key={l} className="extra">
                    <span className="ico" aria-hidden="true"><Icon size={16} /></span>
                    <span><strong>{l}:</strong> {v}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div ref={rightRef} className={`card ${revealClass(rightVis)}`} style={{ transitionDelay: '0.1s' }}>
            {herramientas.map(g => (
              <div key={g.grupo} className="tools-group">
                <div className="tools-head">
                  <h3>{g.grupo}</h3>
                  <span>{String(g.items.length).padStart(2, '0')}</span>
                </div>
                <ul className="chips">
                  {g.items.map(t => <li key={t} className="chip">{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
