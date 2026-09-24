import { useEffect, useRef, useState } from 'react'
import { experiencia, formacion } from '../data/portfolio'

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

function TimelineItem({ item, index, isLast, parentVis }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div style={{
      display: 'flex', gap: 20,
      opacity: parentVis ? 1 : 0,
      transform: parentVis ? 'none' : 'translateX(-20px)',
      transition: `opacity 0.6s ${index * 150}ms, transform 0.6s ${index * 150}ms cubic-bezier(0.16,1,0.3,1)`,
    }}>
      {/* Line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: 10, height: 10,
            border: `2px solid ${open ? 'var(--green)' : 'var(--border)'}`,
            background: open ? 'var(--green)' : 'transparent',
            flexShrink: 0,
            cursor: 'none',
            transition: 'border-color 0.25s, background 0.25s',
          }}
        />
        {!isLast && (
          <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6, minHeight: 48 }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: 36, flex: 1 }}>
        <div
          onClick={() => setOpen(!open)}
          style={{ cursor: 'none', marginBottom: 6 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
              {item.cargo}
            </h3>
            <span style={{
              fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--muted)', background: 'rgba(216,212,204,0.4)',
              padding: '3px 8px', fontWeight: 500, whiteSpace: 'nowrap',
            }}>
              {item.periodo}
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>
            {item.empresa}
          </p>
        </div>

        {/* Expandable */}
        <div style={{
          overflow: 'hidden',
          maxHeight: open ? 400 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height 0.45s ease, opacity 0.35s ease',
        }}>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 12, paddingTop: 4 }}>
            {item.descripcion}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {item.logros.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ color: 'var(--green)', fontSize: 12, marginTop: 1 }}>→</span>
                <p style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.6 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{
            marginTop: 8, background: 'none', border: 'none', cursor: 'none',
            fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          {open ? 'Colapsar' : 'Ver detalle'}
          <span style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>↓</span>
        </button>
      </div>
    </div>
  )
}

export default function Experience() {
  const [ref, vis] = useReveal(0.08)

  const tools = [
    { name: 'AutoCAD · Civil 3D',   tag: 'Planos, catastro y replanteo' },
    { name: 'EPANET · FlowMaster',  tag: 'Cálculo hidráulico' },
    { name: 'Robot · RAM Elements', tag: 'Cálculo estructural' },
    { name: 'Excel avanzado',       tag: 'Tablas dinámicas, macros/VBA' },
    { name: 'SharePoint · Teams',   tag: 'Gestión documental' },
  ]

  return (
    <section id="experiencia" style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 40px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>04 /</span>
          <div style={{ width: 24, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 600 }}>Experiencia</span>
        </div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
              color: 'var(--ink)', marginBottom: 40,
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s, transform 0.7s',
            }}>
              Trayectoria<br />
              <span style={{ color: 'var(--green)' }}>profesional.</span>
            </h2>

            {/* Tools */}
            <div style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s 0.15s, transform 0.7s 0.15s',
            }}>
              <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
                Herramientas & Software
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)' }}>
                {tools.map(({ name, tag }) => (
                  <div key={name}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'var(--paper)', padding: '16px 20px',
                      transition: 'background 0.25s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(28,56,41,0.06)'
                      e.currentTarget.querySelector('[data-tag]').style.color = 'var(--green)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--paper)'
                      e.currentTarget.querySelector('[data-tag]').style.color = 'var(--muted)'
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{name}</span>
                    <span data-tag style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em', transition: 'color 0.2s' }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{
              marginTop: 24, border: '1px solid var(--border)', padding: '20px',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s 0.3s, transform 0.7s 0.3s',
            }}>
              <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Formación</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>{formacion.titulo}</p>
              <p style={{ fontSize: 11, color: 'var(--muted)' }}>{formacion.institucion} · {formacion.periodo} · Promedio {formacion.promedio}</p>
            </div>
          </div>

          {/* RIGHT: Timeline */}
          <div style={{ paddingTop: 4 }}>
            {experiencia.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                isLast={i === experiencia.length - 1}
                parentVis={vis}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
