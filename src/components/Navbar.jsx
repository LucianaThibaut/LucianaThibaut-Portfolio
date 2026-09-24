import { useEffect, useState } from 'react'

const links = [
  { label: 'Perfil',      href: '#perfil' },
  { label: 'Proyectos',   href: '#proyectos' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Contacto',    href: '#contacto' },
]

function go(href) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [solid, setSolid]   = useState(false)
  const [open,  setOpen]    = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: solid ? '1px solid var(--border)' : '1px solid transparent',
        background: solid ? 'rgba(247,244,239,0.96)' : 'transparent',
        backdropFilter: solid ? 'blur(12px)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 40px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <a
          href="#inicio"
          onClick={e => { e.preventDefault(); go('#inicio') }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
        >
          <span style={{
            width: 28, height: 28,
            border: '1.5px solid var(--green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
            color: 'var(--green)',
            transition: 'background 0.25s, color 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.color = 'var(--paper)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--green)' }}
          >
            LT
          </span>
          <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 500 }}>
            Luciana Thibaut
          </span>
        </a>

        {/* Desktop links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={e => { e.preventDefault(); go(href) }}
              className="hline"
              style={{
                fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--muted)', textDecoration: 'none', fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={e => { e.preventDefault(); go('#contacto') }}
            style={{
              fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              fontWeight: 600, padding: '8px 20px',
              border: '1.5px solid var(--ink)',
              color: 'var(--ink)', textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)' }}
          >
            Contactar
          </a>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          style={{ background: 'none', border: 'none', cursor: 'none', padding: 4, display: 'flex', flexDirection: 'column', gap: 5 }}
        >
          <span style={{ display: 'block', width: 22, height: 1, background: 'var(--ink)', transition: 'transform 0.3s', transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ display: 'block', width: 16, height: 1, background: 'var(--ink)', transition: 'opacity 0.3s', opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: 22, height: 1, background: 'var(--ink)', transition: 'transform 0.3s', transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? 300 : 0,
        transition: 'max-height 0.4s ease',
        borderTop: open ? '1px solid var(--border)' : 'none',
        background: 'var(--paper)',
      }}>
        <div style={{ padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(({ label, href }) => (
            <a key={href} href={href}
              onClick={e => { e.preventDefault(); go(href); setOpen(false) }}
              style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
