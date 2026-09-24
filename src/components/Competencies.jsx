import { useEffect, useRef, useState } from 'react'
import { competencias, habilidadesBlandas } from '../data/portfolio'

function useReveal(threshold = 0.12) {
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

function CompCard({ icono, titulo, descripcion, index, parentVisible }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      className="card-fill"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: '1px solid var(--border)',
        padding: '32px 28px',
        cursor: 'default',
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? 'none' : 'translateY(28px)',
        transition: `opacity 0.6s ${index * 75}ms, transform 0.6s ${index * 75}ms cubic-bezier(0.16,1,0.3,1), border-color 0.3s`,
      }}
    >
      {/* Number */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <span style={{
          fontSize: 22, lineHeight: 1,
          color: hov ? 'rgba(247,244,239,0.8)' : 'var(--green)',
          transition: 'color 0.3s',
        }}>{icono}</span>
        <span style={{
          fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
          color: hov ? 'rgba(247,244,239,0.3)' : 'var(--border)',
          transition: 'color 0.3s',
        }}>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 style={{
        fontSize: 14, fontWeight: 700, letterSpacing: '0.01em',
        color: hov ? 'var(--paper)' : 'var(--ink)',
        marginBottom: 10, transition: 'color 0.3s',
      }}>{titulo}</h3>
      <p className="cf-muted" style={{
        fontSize: 12, lineHeight: 1.75,
        color: hov ? 'rgba(247,244,239,0.6)' : 'var(--muted)',
        transition: 'color 0.3s',
      }}>{descripcion}</p>
    </div>
  )
}

export default function Competencies() {
  const [ref, vis] = useReveal(0.1)

  return (
    <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 40px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>02 /</span>
          <div style={{ width: 24, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 600 }}>Competencias Clave</span>
        </div>

        {/* Title */}
        <div ref={ref} style={{ marginBottom: 48 }}>
          <h2 style={{
            fontSize: 'clamp(28px, 3vw, 42px)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
            color: 'var(--ink)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}>
            Lo que aporto<br />
            <span style={{ color: 'var(--green)' }}>a cada proyecto.</span>
          </h2>
        </div>

        {/* Grid 3 cols */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'var(--border)',
        }}>
          {competencias.map((c, i) => (
            <CompCard key={c.titulo} {...c} index={i} parentVisible={vis} />
          ))}
        </div>

        {/* Vacancy strip */}
        <div style={{
          marginTop: 32,
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          padding: '16px 20px',
          border: '1px solid rgba(28,56,41,0.25)',
          background: 'rgba(28,56,41,0.04)',
          opacity: vis ? 1 : 0,
          transition: 'opacity 0.7s 0.5s',
        }}>
          <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green)', fontWeight: 700 }}>Forma de trabajo</span>
          <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
          <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>
            {habilidadesBlandas.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  )
}
