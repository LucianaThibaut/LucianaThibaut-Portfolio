import useReveal, { revealClass } from '../lib/useReveal'

export default function SectionHead({ num, kicker, title, intro, id }) {
  const [ref, visible] = useReveal(0.3)
  return (
    <header ref={ref} className={`section-head ${revealClass(visible)}`}>
      <div>
        <p className="section-kicker">
          <span className="num">{num}</span>
          {kicker}
        </p>
        <h2 id={id} className="section-title">{title}</h2>
      </div>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  )
}
