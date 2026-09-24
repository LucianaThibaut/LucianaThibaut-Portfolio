import { useEffect, useRef, useState } from 'react'

// Marca el elemento como visible la primera vez que entra en pantalla.
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}

export const revealClass = visible => `reveal${visible ? ' is-visible' : ''}`
