import { useEffect, useRef, useState } from 'react'
import DraftFrame from './DraftFrame'
import { personal } from '../data/portfolio'

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [time,   setTime]   = useState('')
  const canvasRef = useRef(null)

  // Entrance
  useEffect(() => { setTimeout(() => setLoaded(true), 80) }, [])

  // Live clock BsAs
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit', minute: '2-digit',
    }))
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  // Grilla de fondo (estática: papel milimetrado)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const draw = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const S = 50
      ctx.strokeStyle = 'rgba(13,13,13,0.05)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += S) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += S) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
    }
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  const tr = (delay = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'none' : 'translateY(24px)',
    transition: `opacity 0.8s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.8s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
  })

  const meta = [
    { l: 'Experiencia', v: '4+ años' },
    { l: 'Actualmente', v: 'Analista de CAD' },
    { l: 'Formación',   v: 'Ing. Civil · UNLaM' },
  ]

  return (
    <section id="inicio" className="hero">
      {/* LEFT */}
      <div className="hero-left">
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

        {/* Cabecera de lámina */}
        <div className="hero-meta" style={tr(0)}>
          <span>{personal.ubicacion}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{time} · BA</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 36 }}>
          <DraftFrame overshoot={18} style={{ ...tr(120), padding: 'clamp(24px, 3.5vw, 44px)' }}>
            <h1 style={{
              fontSize: 'clamp(48px, 6.4vw, 96px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
              color: 'var(--ink)',
            }}>
              Luciana<br />Thibaut
            </h1>
            <div style={{ height: 1, background: 'var(--ink)', margin: '28px 0 14px', width: '100%' }} />
            <p style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', color: 'var(--ink)', fontWeight: 500 }}>
              Ingeniera civil &nbsp;/&nbsp; Gestión documental de proyectos
            </p>
          </DraftFrame>

          <p style={{ ...tr(240), fontSize: 15, lineHeight: 1.75, color: 'var(--muted)', maxWidth: 520 }}>
            Elaboro, controlo y administro la documentación técnica de proyectos
            de ingeniería: planos, memorias de cálculo e informes que conectan
            la oficina técnica con la obra.
          </p>

          <dl className="hero-facts" style={tr(320)}>
            {meta.map(({ l, v }) => (
              <div key={l}>
                <dt>{l}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div style={{ ...tr(400), display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#proyectos" className="btn btn-solid" onClick={e => { e.preventDefault(); go('proyectos') }}>
              Ver proyectos
            </a>
            <a href="#contacto" className="btn btn-line" onClick={e => { e.preventDefault(); go('contacto') }}>
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT: foto a sangre */}
      <figure className="hero-photo" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.2s 200ms ease' }}>
        <img src={personal.foto} alt="Luciana Thibaut, ingeniera civil" />
        <figcaption>
          <span>Luciana Thibaut</span>
          <span>Ingeniera Civil</span>
        </figcaption>
      </figure>
    </section>
  )
}
