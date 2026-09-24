import { useEffect, useRef, useState } from 'react'
import { personal, habilidades } from '../data/portfolio'

function useReveal() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

function SkillBar({ nombre, nivel, delay, visible }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.02em' }}>{nombre}</span>
        <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace" }}>{nivel}%</span>
      </div>
      <div style={{ height: 1, background: 'var(--border)', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          background: 'var(--green)',
          width: visible ? `${nivel}%` : '0%',
          transition: `width 1s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
        }} />
      </div>
    </div>
  )
}

export default function About() {
  const [leftRef,  leftVis]  = useReveal()
  const [rightRef, rightVis] = useReveal()

  const facts = [
    { l: 'Especialidad',  v: 'Oficina Técnica' },
    { l: 'Software clave', v: 'AutoCAD' },
    { l: 'Disponibilidad', v: 'Inmediata' },
    { l: 'Modalidad',      v: 'Presencial / Remoto' },
  ]

  return (
    <section id="perfil" style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 40px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>01 /</span>
          <div style={{ width: 24, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 600 }}>Perfil Profesional</span>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* LEFT */}
          <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s, transform 0.7s',
              color: 'var(--ink)',
            }}>
              Precisión técnica<br />
              <span style={{ color: 'var(--green)' }}>al servicio de la obra.</span>
            </h2>

            <p style={{
              fontSize: 14, lineHeight: 1.8, color: 'var(--muted)',
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s 0.1s, transform 0.7s 0.1s',
            }}>
              {personal.resumen}
            </p>

            {/* Facts grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              border: '1px solid var(--border)',
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s 0.2s, transform 0.7s 0.2s',
            }}>
              {facts.map(({ l, v }, i) => (
                <div
                  key={l}
                  style={{
                    padding: '18px 20px',
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                    transition: 'background 0.25s, color 0.25s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.querySelectorAll('p').forEach(p => { if (p.dataset.role === 'label') p.style.color = 'rgba(247,244,239,0.4)'; else p.style.color = 'var(--paper)' }) }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.querySelectorAll('p').forEach(p => { if (p.dataset.role === 'label') p.style.color = 'var(--muted)'; else p.style.color = 'var(--ink)' }) }}
                >
                  <p data-role="label" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4, transition: 'color 0.25s' }}>{l}</p>
                  <p data-role="value" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', transition: 'color 0.25s' }}>{v}</p>
                </div>
              ))}
            </div>

            {/* Vacancy note */}
            <div style={{
              borderLeft: '2px solid var(--green)',
              paddingLeft: 16,
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s 0.3s, transform 0.7s 0.3s',
            }}>
              <p style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--muted)' }}>
                <strong style={{ color: 'var(--green)' }}>Alineada con la vacante:</strong>{' '}
                Experiencia en interpretación de planos constructivos, fachadas ventiladas, SATE,
                despieces y cuantificación de materiales HPL, aluminio y fibrocemento.
              </p>
            </div>
          </div>

          {/* RIGHT: Skills */}
          <div ref={rightRef} style={{
            display: 'flex', flexDirection: 'column', gap: 24,
            opacity: rightVis ? 1 : 0,
            transform: rightVis ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s 0.15s, transform 0.7s 0.15s',
          }}>
            <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
              Nivel de dominio
            </p>
            {habilidades.map((h, i) => (
              <SkillBar key={h.nombre} {...h} delay={i * 90} visible={rightVis} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
