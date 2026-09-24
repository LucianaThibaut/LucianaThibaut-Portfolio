import { useEffect, useRef, useState } from 'react'
import { proyectos } from '../data/portfolio'

function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, vis]
}

// Láminas en estilo CAD, una por tipo de trabajo real
const W = 'rgba(255,255,255,'
const Sheet = ({ label, children }) => (
  <svg viewBox="0 0 320 180" style={{ width: '100%', height: '100%' }} aria-hidden="true">
    <rect x="0" y="0" width="320" height="180" fill="#0D0D0D" />
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
          <rect x={x-3.5} y={y-3.5} width="7" height="7" fill="#0D0D0D" stroke={`${W}0.8)`} strokeWidth="1" />
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
          <circle cx={x} cy="95" r="3.5" fill="#0D0D0D" stroke="#4F8A6B" strokeWidth="1.5" />
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

function ProjectCard({ proyecto, index, vis }) {
  const IllComp = illustrations[proyecto.plano] || illustrations.pluvial
  const [hov, setHov] = useState(false)

  const isWide = index === 0

  return (
    <article
      style={{
        border: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        gridColumn: isWide ? 'span 2' : 'span 1',
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : 'translateY(32px)',
        transition: `opacity 0.65s ${index * 120}ms, transform 0.65s ${index * 120}ms cubic-bezier(0.16,1,0.3,1), border-color 0.25s`,
        borderColor: hov ? 'var(--ink)' : 'var(--border)',
        cursor: 'default',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Illustration */}
      <div style={{
        height: isWide ? 200 : 180,
        overflow: 'hidden',
        position: 'relative',
        background: '#0D0D0D',
      }}>
        <div style={{
          transition: 'transform 0.6s ease',
          transform: hov ? 'scale(1.02)' : 'scale(1)',
          height: '100%',
        }}>
          <IllComp />
        </div>

        {/* Top label */}
        <div style={{
          position: 'absolute', top: 12, left: 14,
          fontSize: 9, fontFamily: "'JetBrains Mono', monospace",
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em',
        }}>
          {proyecto.periodo}
        </div>

        {/* Badge */}
        {proyecto.destacado && (
          <div style={{
            position: 'absolute', top: 12, right: 14,
            background: 'var(--green)', color: 'var(--paper)',
            fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '3px 8px', fontWeight: 600,
          }}>
            Destacado
          </div>
        )}

        {/* Arrow */}
        <div style={{
          position: 'absolute', bottom: 12, right: 14,
          fontSize: 16, color: 'rgba(255,255,255,0.4)',
          transition: 'transform 0.25s',
          transform: hov ? 'translate(3px,-3px)' : 'none',
        }}>↗</div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 28px', background: 'var(--paper)', flex: 1 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 4 }}>
          {proyecto.titulo}
        </h3>
        <p style={{ fontSize: 11, color: 'var(--green)', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase' }}>
          {proyecto.subtitulo}
        </p>
        <p style={{ fontSize: 12, lineHeight: 1.75, color: 'var(--muted)', marginBottom: 16 }}>
          {proyecto.descripcion}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {proyecto.tags.map(tag => (
            <span key={tag} style={{
              border: '1px solid var(--border)',
              padding: '3px 10px',
              fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--muted)', fontWeight: 500,
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
            >{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [headRef, headVis] = useReveal(0.1)
  const [gridRef, gridVis] = useReveal(0.05)

  return (
    <section id="proyectos" style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 40px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>03 /</span>
          <div style={{ width: 24, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 600 }}>Proyectos</span>
        </div>

        {/* Title row */}
        <div ref={headRef} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 48, gap: 32,
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 3vw, 42px)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
            color: 'var(--ink)',
            opacity: headVis ? 1 : 0,
            transform: headVis ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}>
            Trabajo real,<br />
            <span style={{ color: 'var(--green)' }}>documentado en detalle.</span>
          </h2>
          <p style={{
            fontSize: 12, lineHeight: 1.7, color: 'var(--muted)',
            maxWidth: 300, textAlign: 'right',
            opacity: headVis ? 1 : 0,
            transform: headVis ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s 0.1s, transform 0.7s 0.1s',
            flexShrink: 0,
          }}>
            Hidráulica, pavimentos, instalaciones y catastro, en obra pública y privada: del cálculo al plano que llega a obra.
          </p>
        </div>

        {/* Projects grid */}
        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
          background: 'var(--border)',
        }}>
          {proyectos.map((p, i) => (
            <ProjectCard key={p.id} proyecto={p} index={i} vis={gridVis} />
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'var(--border)',
          marginTop: 1,
        }}>
          {[
            { n: '4+', l: 'Años de experiencia' },
            { n: '4', l: 'Organizaciones públicas y privadas' },
            { n: '5', l: 'Áreas: hidráulica, vial, incendio, catastro, instalaciones' },
          ].map(({ n, l }) => (
            <div key={l}
              style={{
                background: 'var(--paper)', padding: '24px 28px', textAlign: 'center',
                transition: 'background 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--ink)'
                e.currentTarget.querySelectorAll('[data-n]').forEach(el => el.style.color = 'var(--paper)')
                e.currentTarget.querySelectorAll('[data-l]').forEach(el => el.style.color = 'rgba(247,244,239,0.5)')
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--paper)'
                e.currentTarget.querySelectorAll('[data-n]').forEach(el => el.style.color = 'var(--green)')
                e.currentTarget.querySelectorAll('[data-l]').forEach(el => el.style.color = 'var(--muted)')
              }}
            >
              <p data-n style={{ fontSize: 28, fontWeight: 800, color: 'var(--green)', lineHeight: 1, marginBottom: 6, transition: 'color 0.25s' }}>{n}</p>
              <p data-l style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', transition: 'color 0.25s' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
