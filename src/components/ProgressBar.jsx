import { useEffect, useRef } from 'react'

// Barra de progreso de lectura. Escala en X para no forzar reflow.
export default function ProgressBar() {
  const ref = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      if (ref.current) ref.current.style.transform = `scaleX(${total > 0 ? el.scrollTop / total : 0})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return <div ref={ref} className="progress" aria-hidden="true" />
}
