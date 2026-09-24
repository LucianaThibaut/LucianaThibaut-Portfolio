import { ArrowRight, MapPin, HardHat } from 'lucide-react'
import DraftFrame from './DraftFrame'
import { personal } from '../data/portfolio'

const facts = [
  { l: 'Experiencia', v: '4+ años' },
  { l: 'Sectores',    v: 'Público y privado' },
  { l: 'Formación',   v: 'Ing. Civil, UNLaM' },
]

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <div className="hero-meta hero-in">
            <span className="chip"><MapPin size={14} aria-hidden="true" /> {personal.ubicacion}</span>
            <span className="chip"><span className="status-dot" aria-hidden="true" /> Disponible para viajar</span>
          </div>

          <DraftFrame className="hero-frame">
            <h1 id="hero-title" className="hero-name hero-in" style={{ animationDelay: '0.25s' }}>
              Luciana<br />Thibaut
            </h1>
            <p className="hero-role hero-in" style={{ animationDelay: '0.35s' }}>
              <span>Ingeniera civil</span>
              <span className="sep" aria-hidden="true" />
              <span>Gestión documental de proyectos</span>
            </p>
          </DraftFrame>

          <p className="hero-lead hero-in" style={{ animationDelay: '0.45s' }}>
            Elaboro, controlo y administro la documentación técnica de proyectos de
            ingeniería: planos, memorias de cálculo e informes que conectan la oficina
            técnica con la obra.
          </p>

          <dl className="hero-facts hero-in" style={{ animationDelay: '0.55s' }}>
            {facts.map(({ l, v }) => (
              <div key={l}><dt>{l}</dt><dd>{v}</dd></div>
            ))}
          </dl>

          <div className="hero-actions hero-in" style={{ animationDelay: '0.65s' }}>
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#contacto" className="btn btn-ghost">Contactar</a>
          </div>
        </div>

        <figure className="hero-photo hero-in" style={{ animationDelay: '0.3s' }}>
          <img src={personal.foto} alt="Retrato de Luciana Thibaut" width="768" height="1024" fetchpriority="high" />
          <figcaption>
            <span className="ico" aria-hidden="true"><HardHat size={18} /></span>
            <span>
              <small>Actualmente</small>
              <strong>Analista de CAD en Soluciones Químicas S.A.</strong>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
