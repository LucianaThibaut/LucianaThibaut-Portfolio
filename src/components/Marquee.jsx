import { marqueeItems } from '../data/portfolio'

// Franja de herramientas y especialidades. La lista se duplica para el loop.
export default function Marquee() {
  return (
    <div className="ticker" role="region" aria-label="Herramientas y especialidades">
      <ul className="sr-only">
        {marqueeItems.map(item => <li key={item}>{item}</li>)}
      </ul>
      <div className="ticker-track" aria-hidden="true">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
