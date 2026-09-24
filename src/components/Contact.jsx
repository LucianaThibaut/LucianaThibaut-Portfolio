import { useEffect, useRef, useState } from 'react'
import { personal } from '../data/portfolio'

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

function FloatField({ label, name, type = 'text', isTextarea = false, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  const style = {
    width: '100%',
    background: 'transparent',
    border: `1px solid ${focused ? 'rgba(247,244,239,0.5)' : 'rgba(247,244,239,0.15)'}`,
    padding: isTextarea ? '28px 16px 12px' : '26px 16px 10px',
    fontSize: 13, color: 'var(--paper)',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'none',
    transition: 'border-color 0.2s',
    display: 'block',
  }

  return (
    <div style={{ position: 'relative' }}>
      <label style={{
        position: 'absolute', left: 16,
        top: active ? 10 : '50%',
        transform: active || isTextarea ? 'none' : 'translateY(-50%)',
        fontSize: active ? 9 : 13,
        letterSpacing: active ? '0.14em' : '0.01em',
        textTransform: active ? 'uppercase' : 'none',
        color: active ? 'rgba(247,244,239,0.4)' : 'rgba(247,244,239,0.35)',
        pointerEvents: 'none',
        transition: 'all 0.2s ease',
        zIndex: 1,
      }}>
        {label}
      </label>
      {isTextarea
        ? <textarea rows={4} name={name} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={style} />
        : <input type={type} name={name} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...style, paddingTop: active ? 24 : 16 }} />
      }
    </div>
  )
}

export default function Contact() {
  const [ref, vis] = useReveal(0.1)
  const [form, setForm]         = useState({ name: '', email: '', message: '' })
  const [copied, setCopied]     = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contacto" style={{ background: 'var(--ink)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 40px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.25)', fontWeight: 500 }}>05 /</span>
          <div style={{ width: 24, height: 1, background: 'rgba(247,244,239,0.1)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.4)', fontWeight: 600 }}>Contacto</span>
        </div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1,
              color: 'var(--paper)',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s, transform 0.7s',
            }}>
              Trabajemos<br />
              <span style={{ color: 'var(--sand)' }}>juntos.</span>
            </h2>

            <p style={{
              fontSize: 14, lineHeight: 1.75, color: 'rgba(247,244,239,0.5)',
              maxWidth: 360,
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s 0.1s, transform 0.7s 0.1s',
            }}>
              Disponible para incorporación inmediata. Listos para conversar sobre cómo puedo aportar a tu equipo de oficina técnica.
            </p>

            {/* Contact options */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 1,
              background: 'rgba(247,244,239,0.06)',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s 0.2s, transform 0.7s 0.2s',
            }}>
              {/* Email */}
              <button
                onClick={copyEmail}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'rgba(247,244,239,0.04)',
                  border: 'none', borderBottom: '1px solid rgba(247,244,239,0.06)',
                  padding: '20px 20px', cursor: 'none', textAlign: 'left',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(247,244,239,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(247,244,239,0.04)'}
              >
                <div>
                  <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.3)', marginBottom: 4 }}>Email</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--paper)' }}>{personal.email}</p>
                </div>
                <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: copied ? 'var(--sand)' : 'rgba(247,244,239,0.3)', transition: 'color 0.2s' }}>
                  {copied ? '✓ Copiado' : 'Copiar →'}
                </span>
              </button>

              {/* LinkedIn */}
              <a
                href={`https://${personal.linkedin}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'rgba(247,244,239,0.04)',
                  borderBottom: '1px solid rgba(247,244,239,0.06)',
                  padding: '20px 20px', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(247,244,239,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(247,244,239,0.04)'}
              >
                <div>
                  <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.3)', marginBottom: 4 }}>LinkedIn</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--paper)' }}>{personal.linkedin}</p>
                </div>
                <span style={{ fontSize: 13, color: 'rgba(247,244,239,0.3)' }}>↗</span>
              </a>

              {/* Location */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'rgba(247,244,239,0.04)', padding: '20px 20px',
              }}>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.3)', marginBottom: 4 }}>Ubicación</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--paper)' }}>{personal.ubicacion}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sand)', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.3)' }}>disponible</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s 0.25s, transform 0.7s 0.25s',
          }}>
            {submitted ? (
              <div style={{
                minHeight: 320, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center',
              }}>
                <div style={{ fontSize: 40, color: 'var(--sand)', lineHeight: 1 }}>✓</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--paper)' }}>¡Mensaje enviado!</h3>
                <p style={{ fontSize: 13, color: 'rgba(247,244,239,0.5)' }}>Luciana te responderá a la brevedad.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                  style={{
                    marginTop: 8, background: 'none', border: 'none', cursor: 'none',
                    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'rgba(247,244,239,0.3)', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--paper)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,244,239,0.3)'}
                >Enviar otro →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.3)', marginBottom: 8 }}>
                  Mensaje rápido
                </p>
                <FloatField label="Tu nombre" name="name" value={form.name} onChange={handleChange} />
                <FloatField label="Tu email" name="email" type="email" value={form.email} onChange={handleChange} />
                <FloatField label="Mensaje" name="message" isTextarea value={form.message} onChange={handleChange} />
                <button
                  type="submit"
                  style={{
                    marginTop: 4,
                    border: '1.5px solid rgba(247,244,239,0.3)',
                    background: 'transparent',
                    color: 'var(--paper)',
                    padding: '14px 28px',
                    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                    cursor: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--paper)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--paper)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--paper)'; e.currentTarget.style.borderColor = 'rgba(247,244,239,0.3)' }}
                >
                  Enviar mensaje <span style={{ fontSize: 14 }}>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
