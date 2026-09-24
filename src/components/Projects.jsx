import SectionHead from './SectionHead'
import DraftFrame from './DraftFrame'
import useReveal, { revealClass } from '../lib/useReveal'
import { proyectos } from '../data/portfolio'

// Láminas en estilo CAD, una por tipo de trabajo real
const W = 'rgba(255,255,255,'
const Sheet = ({ label, children }) => (
  <svg viewBox="0 0 320 180" style={{ width: '100%', height: '100%' }} aria-hidden="true">
    <rect x="0" y="0" width="320" height="180" fill="#111311" />
    {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="180" stroke={`${W}0.04)`} strokeWidth="0.5" />)}
    {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*45} x2="320" y2={i*45} stroke={`${W}0.04)`} strokeWidth="0.5" />)}
    {children}
    <line x1="0" y1="168" x2="320" y2="168" stroke={`${W}0.08)`} strokeWidth="0.5" />
    <text x="10" y="178" fontSize="7" fill={`${W}0.3)`} fontFamily="monospace" letterSpacing="1">{label}</text>
  </svg>
)

const illustrations = {
  // Manzanas con traza de conducto relevado y cámaras numeradas
  catastro: () => (
    <Sheet label="PLANTA CATASTRAL — CONDUCTOS PLUVIALES · CABA">
      {[[20,20],[110,20],[200,20],[20,95],[110,95],[200,95]].map(([x,y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="72" height="55" fill="none" stroke={`${W}0.18)`} strokeWidth="0.8" />
      ))}
      <polyline points="10,84 101,84 101,160" fill="none" stroke={`${W}0.7)`} strokeWidth="1.6" />
      <polyline points="101,84 191,84 191,10" fill="none" stroke={`${W}0.7)`} strokeWidth="1.6" />
      <line x1="191" y1="84" x2="300" y2="84" stroke="#4F8A6B" strokeWidth="1.6" strokeDasharray="4 3" />
      {[[10,84],[101,84],[191,84],[101,150],[191,20]].map(([x,y], i) => (
        <g key={i}>
          <rect x={x-3.5} y={y-3.5} width="7" height="7" fill="#111311" stroke={`${W}0.8)`} strokeWidth="1" />
          <text x={x+6} y={y-6} fontSize="6" fill={`${W}0.35)`} fontFamily="monospace">C-{String(i+1).padStart(2,'0')}</text>
        </g>
      ))}
      <text x="238" y="80" fontSize="6" fill="#4F8A6B" fontFamily="monospace">A RELEVAR</text>
    </Sheet>
  ),
  // Red ramificada de sumideros hacia la descarga
  pluvial: () => (
    <Sheet label="PLANTA — RED DE DESAGÜE PLUVIAL · ESC. 1:500">
      <line x1="30" y1="95" x2="280" y2="95" stroke={`${W}0.7)`} strokeWidth="2" />
      {[70,120,170,220].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="95" x2={x - 18} y2={i % 2 ? 140 : 45} stroke={`${W}0.35)`} strokeWidth="1" />
          <rect x={x - 24} y={(i % 2 ? 140 : 45) - 3} width="12" height="6" fill="none" stroke={`${W}0.5)`} strokeWidth="0.8" />
          <circle cx={x} cy="95" r="3.5" fill="#111311" stroke="#4F8A6B" strokeWidth="1.5" />
        </g>
      ))}
      <polygon points="280,89 296,95 280,101" fill="#4F8A6B" />
      <text x="248" y="112" fontSize="6" fill={`${W}0.35)`} fontFamily="monospace">DESCARGA</text>
      {[45,95,145,195].map(x => (
        <text key={x} x={x} y="90" fontSize="5" fill={`${W}0.3)`} fontFamily="monospace">i=0.3%</text>
      ))}
    </Sheet>
  ),
  // Perfil longitudinal: terreno natural vs rasante proyectada
  pavimento: () => (
    <Sheet label="PLANIALTIMETRÍA — PERFIL LONGITUDINAL">
      <polyline points="20,110 60,98 100,114 140,92 180,104 220,88 260,100 300,94" fill="none" stroke={`${W}0.35)`} strokeWidth="1" strokeDasharray="3 2" />
      <line x1="20" y1="104" x2="300" y2="96" stroke={`${W}0.8)`} strokeWidth="1.6" />
      {[20,60,100,140,180,220,260,300].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="125" x2={x} y2="140" stroke={`${W}0.2)`} strokeWidth="0.5" />
          <text x={x} y="150" fontSize="5.5" fill={`${W}0.35)`} fontFamily="monospace" textAnchor="middle">{`0+${String(i*20).padStart(3,'0')}`}</text>
        </g>
      ))}
      <line x1="20" y1="125" x2="300" y2="125" stroke={`${W}0.2)`} strokeWidth="0.5" />
      <text x="24" y="40" fontSize="6" fill={`${W}0.35)`} fontFamily="monospace">- - TERRENO NATURAL</text>
      <text x="24" y="50" fontSize="6" fill="#4F8A6B" fontFamily="monospace">—— RASANTE PROYECTO</text>
    </Sheet>
  ),
  // Axonometría de red de incendio con bocas y rociadores
  incendio: () => (
    <Sheet label="AXONOMETRÍA — RED DE INCENDIO · NAVE INDUSTRIAL">
      <polyline points="40,140 40,60 240,60" fill="none" stroke={`${W}0.75)`} strokeWidth="1.8" />
      <line x1="40" y1="60" x2="90" y2="30" stroke={`${W}0.5)`} strokeWidth="1.2" />
      <line x1="240" y1="60" x2="290" y2="30" stroke={`${W}0.5)`} strokeWidth="1.2" />
      <line x1="90" y1="30" x2="290" y2="30" stroke={`${W}0.5)`} strokeWidth="1.2" />
      {[80,120,160,200].map(x => (
        <g key={x}>
          <line x1={x} y1="60" x2={x + 25} y2="45" stroke={`${W}0.3)`} strokeWidth="0.8" />
          <circle cx={x} cy="66" r="2.5" fill="none" stroke="#4F8A6B" strokeWidth="1.2" />
          <circle cx={x + 25} cy="51" r="2" fill="none" stroke="#4F8A6B" strokeWidth="1" />
        </g>
      ))}
      <rect x="30" y="140" width="20" height="14" fill="none" stroke={`${W}0.6)`} strokeWidth="1" />
      <text x="56" y="150" fontSize="6" fill={`${W}0.35)`} fontFamily="monospace">BOMBA</text>
      <circle cx="40" cy="100" r="4" fill="none" stroke={`${W}0.6)`} strokeWidth="1" />
      <text x="48" y="102" fontSize="6" fill={`${W}0.35)`} fontFamily="monospace">BIE</text>
    </Sheet>
  ),
  // Planta de edificio con recorrido de evacuación
  evacuacion: () => (
    <Sheet label="PLANTA — MEDIOS DE ESCAPE · EDIFICIO PÚBLICO">
      <rect x="30" y="22" width="260" height="134" fill="none" stroke={`${W}0.6)`} strokeWidth="1.6" />
      <line x1="30" y1="90" x2="290" y2="90" stroke={`${W}0.25)`} strokeWidth="0.8" />
      <line x1="30" y1="110" x2="290" y2="110" stroke={`${W}0.25)`} strokeWidth="0.8" />
      {[95,160,225].map(x => (
        <g key={x}>
          <line x1={x} y1="22" x2={x} y2="90" stroke={`${W}0.25)`} strokeWidth="0.8" />
          <line x1={x} y1="110" x2={x} y2="156" stroke={`${W}0.25)`} strokeWidth="0.8" />
        </g>
      ))}
      <polyline points="62,56 62,100 280,100" fill="none" stroke="#4F8A6B" strokeWidth="1.4" strokeDasharray="5 3" />
      <polygon points="280,95 290,100 280,105" fill="#4F8A6B" />
      <text x="228" y="122" fontSize="6" fill="#4F8A6B" fontFamily="monospace">SALIDA</text>
    </Sheet>
  ),
}

function ProjectSpread({ proyecto, index }) {
  const [ref, visible] = useReveal(0.15)
  const Lamina = illustrations[proyecto.plano] || illustrations.pluvial
  const num = String(index + 1).padStart(2, '0')

  return (
    <article ref={ref} className={`spread${index % 2 ? ' flip' : ''} ${revealClass(visible)}`} aria-labelledby={`p-${proyecto.id}`}>
      <div className="spread-media">
        <Lamina />
        <div className="spread-badges">
          {proyecto.destacado && <span className="badge is-accent">Destacado</span>}
        </div>
      </div>

      <div>
        <DraftFrame className="spread-frame">
          <p className="spread-num">Proyecto {num}</p>
          <h3 id={`p-${proyecto.id}`} className="spread-title">{proyecto.titulo}</h3>
          <p className="spread-client">{proyecto.subtitulo}</p>
        </DraftFrame>

        <p className="spread-desc">{proyecto.descripcion}</p>

        <dl className="spread-meta">
          <div><dt>Rol</dt><dd>{proyecto.rol}</dd></div>
          <div><dt>Período</dt><dd>{proyecto.periodo}</dd></div>
          <div className="full"><dt>Entregables</dt><dd>{proyecto.entregables}</dd></div>
        </dl>

        <ul className="chips">
          {proyecto.tags.map(t => <li key={t} className="chip">{t}</li>)}
        </ul>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="proyectos" className="section" aria-labelledby="proyectos-title">
      <div className="container">
        <SectionHead
          id="proyectos-title"
          num="03"
          kicker="Proyectos"
          title="Trabajo real, documentado en detalle."
          intro="Hidráulica, pavimentos, instalaciones y catastro, en obra pública y privada: del cálculo al plano que llega a obra."
        />
        {proyectos.map((p, i) => <ProjectSpread key={p.id} proyecto={p} index={i} />)}
      </div>
    </section>
  )
}
