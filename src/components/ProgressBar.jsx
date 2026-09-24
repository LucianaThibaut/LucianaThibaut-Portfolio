import { useEffect, useState } from 'react'
export default function ProgressBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el  = document.documentElement
      const tot = el.scrollHeight - el.clientHeight
      setW(tot > 0 ? (el.scrollTop / tot) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="prog" style={{ width: `${w}%` }} />
}
