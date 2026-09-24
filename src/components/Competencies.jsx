import { FileText, FolderKanban, Droplets, Flame, HardHat, Users } from 'lucide-react'
import SectionHead from './SectionHead'
import useReveal, { revealClass } from '../lib/useReveal'
import { competencias, habilidadesBlandas } from '../data/portfolio'

// Ícono por competencia, en el mismo orden que los datos
const icons = [FileText, FolderKanban, Droplets, Flame, HardHat, Users]

export default function Competencies() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="competencias" className="section" aria-labelledby="competencias-title">
      <div className="container">
        <SectionHead
          id="competencias-title"
          num="02"
          kicker="Competencias"
          title="Lo que aporto a cada proyecto."
          intro="Del cálculo y el dibujo a la gestión de la documentación y el seguimiento en obra."
        />

        <div ref={ref} className={`skills-grid ${revealClass(visible)}`}>
          {competencias.map((c, i) => {
            const Icon = icons[i] ?? FileText
            return (
              <article key={c.titulo} className="skill">
                <span className="ico" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                <h3>{c.titulo}</h3>
                <p>{c.descripcion}</p>
              </article>
            )
          })}
        </div>

        <div className="soft">
          <span className="soft-label">Forma de trabajo</span>
          {habilidadesBlandas.map(h => <span key={h} className="chip">{h}</span>)}
        </div>
      </div>
    </section>
  )
}
