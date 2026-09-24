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

// Clean AutoCAD-style SVG illustrations
const illustrations = {
  0: () => (
    <svg viewBox="0 0 320 180" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="320" height="180" fill="#0D0D0D" />
      {/* Grid */}
      {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*45} x2="320" y2={i*45} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {/* Pipe main */}
      <line x1="40" y1="90" x2="280" y2="90" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <line x1="40" y1="84" x2="40" y2="96" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <line x1="280" y1="84" x2="280" y2="96" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      {/* Branches */}
      {[90,140,190,240].map(x => (
        <g key={x}>
          <line x1={x} y1="90" x2={x} y2="50" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <line x1={x-8} y1="50" x2={x+8} y2="50" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <circle cx={x} cy="90" r="3.5" fill="none" stroke="#2A5240" strokeWidth="1.5" />
        </g>
      ))}
      {/* North arrow */}
      <line x1="290" y1="30" x2="290" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <polygon points="290,12 287,20 293,20" fill="rgba(255,255,255,0.5)" />
      <text x="287" y="35" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="monospace">N</text>
      {/* Label */}
      <line x1="0" y1="168" x2="320" y2="168" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <text x="10" y="178" fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="monospace" letterSpacing="1">PLANTA — RED HIDRÁULICA · ESC. 1:100</text>
    </svg>
  ),
  1: () => (
    <svg viewBox="0 0 320 180" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="320" height="180" fill="#0D0D0D" />
      {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*45} x2="320" y2={i*45} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {/* Road layers */}
      <rect x="20" y="70" width="280" height="20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
      <rect x="20" y="90" width="280" height="14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      <rect x="20" y="104" width="280" height="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      {/* Dim lines */}
      <line x1="20" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <line x1="20" y1="58" x2="20" y2="62" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      <line x1="300" y1="58" x2="300" y2="62" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      <text x="155" y="57" fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="monospace" textAnchor="middle">280.00</text>
      {/* Section hatch */}
      {[40,60,80,100,120,140,160,180,200,220,240,260,280].map(x => (
        <line key={x} x1={x} y1="90" x2={x+8} y2="104" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      ))}
      <text x="10" y="178" fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="monospace" letterSpacing="1">SECCIÓN TRANSVERSAL — PAVIMENTO · ESC. 1:50</text>
      <line x1="0" y1="168" x2="320" y2="168" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    </svg>
  ),
  2: () => (
    <svg viewBox="0 0 320 180" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="320" height="180" fill="#0D0D0D" />
      {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*45} x2="320" y2={i*45} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {/* Facade panels */}
      <rect x="20" y="20" width="280" height="140" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
      {/* Horizontal joints */}
      {[20,50,80,110,140].map(y => (
        <line key={y} x1="20" y1={y+20} x2="300" y2={y+20} stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
      ))}
      {/* Vertical joints */}
      {[80,140,200,260].map(x => (
        <line key={x} x1={x} y1="20" x2={x} y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      ))}
      {/* Windows */}
      {[[40,55],[100,55],[160,55],[220,55]].map(([x,y]) => (
        <rect key={x} x={x} y={y} width="30" height="35" fill="none" stroke="#2A5240" strokeWidth="1.2" />
      ))}
      {/* Dimension */}
      <line x1="20" y1="168" x2="300" y2="168" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <text x="10" y="178" fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="monospace" letterSpacing="1">ALZADO — FACHADA VENTILADA · ESC. 1:75</text>
      <line x1="0" y1="169" x2="320" y2="169" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    </svg>
  ),
  3: () => (
    <svg viewBox="0 0 320 180" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="320" height="180" fill="#0D0D0D" />
      {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*45} x2="320" y2={i*45} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {/* Beam */}
      <rect x="20" y="75" width="280" height="30" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
      {/* Rebars */}
      {[35,55,75,95,115,135,155,175,195,215,235,255,275].map(x => (
        <circle key={x} cx={x} cy="90" r="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      ))}
      {[35,55,75,95,115,135,155,175,195,215,235,255,275].map(x => (
        <circle key={`b${x}`} cx={x} cy="97" r="2.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      ))}
      {/* Stirrups */}
      {[40,90,140,190,240,280].map(x => (
        <rect key={x} x={x} y="78" width="8" height="24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
      ))}
      <text x="10" y="178" fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="monospace" letterSpacing="1">SECCIÓN — VIGA HORMIGÓN ARMADO · ESC. 1:20</text>
      <line x1="0" y1="168" x2="320" y2="168" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    </svg>
  ),
}

function ProjectCard({ proyecto, index, vis }) {
  const IllComp = illustrations[index] || illustrations[0]
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
          color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em',
        }}>
          {String(index + 1).padStart(2, '0')} · AUTOCAD
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
            Experiencia en<br />
            <span style={{ color: 'var(--green)' }}>múltiples disciplinas.</span>
          </h2>
          <p style={{
            fontSize: 12, lineHeight: 1.7, color: 'var(--muted)',
            maxWidth: 300, textAlign: 'right',
            opacity: headVis ? 1 : 0,
            transform: headVis ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s 0.1s, transform 0.7s 0.1s',
            flexShrink: 0,
          }}>
            Cada proyecto elaborado en AutoCAD con documentación técnica completa y coordinación con equipos de obra.
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
            { n: '4+', l: 'Tipos de proyecto en AutoCAD' },
            { n: '100%', l: 'Documentación técnica generada' },
            { n: '0',   l: 'Incompatibilidades no detectadas' },
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
