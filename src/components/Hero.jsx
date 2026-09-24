import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [loaded,  setLoaded]  = useState(false)
  const [time,    setTime]    = useState('')
  const canvasRef = useRef(null)

  // Entrance
  useEffect(() => { setTimeout(() => setLoaded(true), 80) }, [])

  // Live clock BsAs
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Grid canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let t = 0, raf

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const S = 50
      ctx.strokeStyle = 'rgba(28,56,41,0.07)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += S) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += S) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
      // animated intersections
      ctx.fillStyle = 'rgba(28,56,41,0.18)'
      for (let x = S; x < canvas.width; x += S) {
        for (let y = S; y < canvas.height; y += S) {
          const d = Math.hypot(x - canvas.width * 0.65, y - canvas.height * 0.5)
          const r = (Math.sin(d * 0.025 - t * 0.025) * 0.5 + 0.5) * 2.2
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
        }
      }
      t++
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const tr = (delay = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'none' : 'translateY(32px)',
    transition: `opacity 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
  })

  return (
    <section id="inicio" style={{ position: 'relative', minHeight: '100vh', background: 'var(--paper)', overflow: 'hidden' }}>
      {/* Grid canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Top metadata bar */}
      <div style={{
        position: 'absolute', top: 80, left: 0, right: 0,
        maxWidth: 1280, margin: '0 auto',
        padding: '0 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Buenos Aires, ARG
          </span>
        </div>
        <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace" }}>
          {time}
        </span>
      </div>

      {/* Main content — perfectly centered vertically */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1280, margin: '0 auto',
        padding: '0 40px',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        alignItems: 'center',
        gap: 60,
      }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Eyebrow */}
          <div style={{ ...tr(0), display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 1, background: 'var(--green)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--green)', fontWeight: 600 }}>
              Ingeniería Civil · Oficina Técnica
            </span>
          </div>

          {/* Name */}
          <div style={tr(80)}>
            <h1 style={{
              fontSize: 'clamp(52px, 7vw, 96px)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
            }}>
              Luciana<br />
              <span style={{ color: 'var(--green)' }}>Thibaut</span>
            </h1>
          </div>

          {/* Summary */}
          <p style={{
            ...tr(160),
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--muted)',
            maxWidth: 480,
          }}>
            Especialista en documentación técnica, elaboración de planos en AutoCAD
            y preparación de obras para proyectos de construcción e infraestructura.
          </p>

          {/* Keyword chips */}
          <div style={{ ...tr(240), display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['AutoCAD', 'Ofic. Técnica', 'Fachadas SATE', 'Hidráulica', 'Pavimentos'].map(k => (
              <span key={k} style={{
                border: '1px solid var(--border)',
                padding: '5px 12px',
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--muted)', fontWeight: 500,
              }}>{k}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ ...tr(320), display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#proyectos"
              onClick={e => { e.preventDefault(); document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--green)', color: 'var(--paper)',
                padding: '13px 28px',
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                textDecoration: 'none',
                border: '1.5px solid var(--green)',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--green-light)'; e.currentTarget.style.borderColor = 'var(--green-light)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.borderColor = 'var(--green)' }}
            >
              Ver proyectos <span style={{ fontSize: 14 }}>→</span>
            </a>
            <a
              href="#contacto"
              onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1.5px solid var(--ink)', color: 'var(--ink)',
                padding: '13px 28px',
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)' }}
            >
              Contactar
            </a>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div style={{ ...tr(200), display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            {/* Offset decorative border */}
            <div style={{
              position: 'absolute', top: -12, right: -12,
              width: '100%', height: '100%',
              border: '1.5px solid var(--green)', opacity: 0.35,
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', bottom: -12, left: -12,
              width: '100%', height: '100%',
              border: '1px solid var(--border)',
              zIndex: 0,
            }} />

            {/* Photo */}
            <div style={{
              position: 'relative', zIndex: 1,
              width: 340, height: 440,
              overflow: 'hidden',
              background: 'var(--border)',
            }}>
              <img
                src="/luciana.jpg"
                alt="Luciana Thibaut — Ingeniera Civil"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                  filter: 'grayscale(20%)',
                  transition: 'filter 0.6s, transform 0.6s',
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(20%)'; e.currentTarget.style.transform = 'scale(1)' }}
              />
              {/* Caption overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'rgba(13,13,13,0.75)',
                backdropFilter: 'blur(8px)',
                padding: '12px 16px',
              }}>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.5)', marginBottom: 2 }}>
                  Ingeniera Civil
                </p>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--paper)' }}>
                  Luciana Thibaut
                </p>
              </div>
            </div>

            {/* Floating chips */}
            <div style={{
              position: 'absolute', top: 24, left: -56, zIndex: 2,
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              padding: '10px 14px',
              boxShadow: '0 4px 24px rgba(13,13,13,0.08)',
            }}>
              <p style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>Experiencia</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>3+ años</p>
            </div>

            <div style={{
              position: 'absolute', bottom: 60, right: -20, zIndex: 2,
              background: 'var(--green)',
              padding: '10px 14px',
              boxShadow: '0 4px 24px rgba(13,13,13,0.15)',
            }}>
              <p style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.5)', marginBottom: 2 }}>Proyectos</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--paper)', lineHeight: 1 }}>15+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        zIndex: 2, opacity: 0.45,
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ink)' }}>scroll</span>
        <div style={{ width: 1, height: 40, background: 'var(--muted)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, width: '100%', height: '50%',
            background: 'var(--green)',
            animation: 'scrollDown 1.6s ease infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        .hidden-mobile { display: flex !important; }
        .show-mobile   { display: none  !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none  !important; }
          .show-mobile   { display: flex  !important; }
        }
      `}</style>
    </section>
  )
}
