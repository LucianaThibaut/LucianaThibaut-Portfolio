import { marqueeItems } from '../data/portfolio'

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems]
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--ink)',
      overflow: 'hidden',
      padding: '14px 0',
    }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 20,
            padding: '0 20px',
            fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(247,244,239,0.45)', fontWeight: 500,
          }}>
            {item}
            <span style={{ color: 'var(--green)', opacity: 0.7 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
