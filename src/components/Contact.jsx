import { useState } from 'react'
import { Mail, Phone, MapPin, Copy, Check, ArrowRight } from 'lucide-react'
import useReveal, { revealClass } from '../lib/useReveal'
import { personal } from '../data/portfolio'

export default function Contact() {
  const [ref, visible] = useReveal(0.15)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState(false)
  const [opened, setOpened] = useState(false)

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  // Sin backend: arma el mail en el cliente de correo de quien escribe
  const submit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Consulta desde el portfolio: ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  return (
    <section id="contacto" className="contact" aria-labelledby="contacto-title">
      <div className="container">
        <div ref={ref} className={`contact-panel ${revealClass(visible)}`}>
          <div>
            <p className="section-kicker"><span className="num">04</span> Contacto</p>
            <h2 id="contacto-title" className="contact-title">Trabajemos juntos.</h2>
            <p className="contact-text">
              Si tu equipo necesita producir, ordenar o controlar la documentación técnica
              de un proyecto de ingeniería, escribime.
            </p>

            <div className="contact-list">
              <button type="button" className="contact-item" onClick={copyEmail}>
                <span className="ico" aria-hidden="true"><Mail size={18} /></span>
                <span><small>Email</small><strong>{personal.email}</strong></span>
                <span className="end" aria-live="polite">
                  {copied ? <><Check size={15} aria-hidden="true" /> Copiado</> : <><Copy size={15} aria-hidden="true" /> Copiar</>}
                </span>
              </button>
              <a className="contact-item" href={personal.telefonoHref}>
                <span className="ico" aria-hidden="true"><Phone size={18} /></span>
                <span><small>Teléfono</small><strong>{personal.telefono}</strong></span>
              </a>
              <div className="contact-item">
                <span className="ico" aria-hidden="true"><MapPin size={18} /></span>
                <span><small>Ubicación</small><strong>{personal.ubicacion}</strong></span>
              </div>
            </div>
          </div>

          <form className="form" onSubmit={submit}>
            <h3>Escribime un mensaje</h3>
            <p className="hint">Se abre tu programa de correo con el mensaje listo para enviar.</p>
            <div className="field">
              <label htmlFor="c-name">Nombre</label>
              <input id="c-name" name="name" autoComplete="name" required value={form.name} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="c-msg">Mensaje</label>
              <textarea id="c-msg" name="message" required value={form.message} onChange={update} />
            </div>
            <button type="submit" className="btn btn-primary">
              Preparar email <ArrowRight size={18} aria-hidden="true" />
            </button>
            {opened && (
              <p className="form-done" role="status">
                Listo. Si tu correo no se abrió, escribí a {personal.email}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
