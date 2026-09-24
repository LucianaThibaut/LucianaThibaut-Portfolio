export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--paper)',
      padding: '24px 40px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 22, height: 22,
            border: '1.5px solid var(--green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.04em',
          }}>LT</span>
          <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Luciana Thibaut — Ingeniera Civil · Ituzaingó, Buenos Aires
          </span>
        </div>

        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()} · Buenos Aires, Argentina
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {[
            { l: 'Email', h: 'mailto:lucianathibaut@hotmail.com' },
            { l: 'Teléfono', h: 'tel:+541139575435' },
          ].map(({ l, h }) => (
            <a key={l} href={h}
              className="hline"
              style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
