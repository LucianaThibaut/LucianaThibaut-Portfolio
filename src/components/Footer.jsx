import { Mail, Phone } from 'lucide-react'
import { personal } from '../data/portfolio'

// Pie sencillo con los datos de contacto. Los botones "Contactar" apuntan acá.
export default function Footer() {
  return (
    <footer id="contacto" className="footer" aria-labelledby="contacto-title">
      <div className="container footer-inner">
        <div>
          <h2 id="contacto-title" className="footer-name">Luciana Thibaut</h2>
          <p>Ingeniera civil · {personal.ubicacion}</p>
        </div>
        <ul className="footer-contact">
          <li>
            <a href={`mailto:${personal.email}`}>
              <Mail size={17} aria-hidden="true" /> {personal.email}
            </a>
          </li>
          <li>
            <a href={personal.telefonoHref}>
              <Phone size={17} aria-hidden="true" /> {personal.telefono}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
