import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { label: 'Perfil',       id: 'perfil' },
  { label: 'Proyectos',    id: 'proyectos' },
  { label: 'Experiencia',  id: 'experiencia' },
]

export default function Navbar() {
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)

  // Sección activa según lo que está en el centro de la pantalla
  useEffect(() => {
    const ids = ['inicio', ...links.map(l => l.id), 'contacto']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // Cerrar el menú móvil con Escape
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav${open ? ' is-open' : ''}`}>
      <div className="nav-inner">
        <a href="#inicio" className="nav-pill nav-brand nav-brand-pill" aria-label="Luciana Thibaut, ir al inicio">
          <span className="nav-mono" aria-hidden="true">LT</span>
          <span className="nav-name">
            <strong>Luciana Thibaut</strong>
            <span>Ingeniera civil</span>
          </span>
        </a>

        <nav className="nav-pill nav-links" aria-label="Secciones">
          {links.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${active === id ? ' is-active' : ''}`}
              aria-current={active === id ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
          <a href="#contacto" className="btn btn-primary nav-cta">
            Contactar <ArrowRight size={16} aria-hidden="true" />
          </a>
        </nav>

        <div className="nav-pill nav-toggle-pill" style={{ padding: 6 }}>
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav id="nav-sheet" className="nav-sheet" aria-label="Secciones">
        {[...links, { label: 'Contacto', id: 'contacto' }].map(({ label, id }) => (
          <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
