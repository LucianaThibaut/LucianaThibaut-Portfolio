import { personal } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Luciana Thibaut, ingeniera civil. {personal.ubicacion}.</p>
        <nav className="footer-links" aria-label="Contacto">
          <a href={`mailto:${personal.email}`}>Email</a>
          <a href={personal.telefonoHref}>Teléfono</a>
          <a href="#inicio">Volver arriba</a>
        </nav>
      </div>
    </footer>
  )
}
