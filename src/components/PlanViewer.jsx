import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ZoomIn, ZoomOut, Maximize, ChevronLeft, ChevronRight } from 'lucide-react'

const MIN = 1
const MAX = 8
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

// Visor de planos a pantalla completa: zoom con rueda / pellizco / botones,
// arrastre para desplazarse, doble clic para acercar, flechas para cambiar de lámina.
export default function PlanViewer({ laminas, index, onIndex, onClose }) {
  const lamina = laminas[index]
  const stageRef = useRef(null)
  const closeRef = useRef(null)
  const pointers = useRef(new Map())
  const pinch = useRef(null)
  const [view, setView] = useState({ s: 1, x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  const reset = useCallback(() => setView({ s: 1, x: 0, y: 0 }), [])

  // Zoom manteniendo fijo el punto (cx, cy), medido desde el centro del escenario
  const zoomAt = useCallback((factor, cx = 0, cy = 0) => {
    setView(v => {
      const s = clamp(v.s * factor, MIN, MAX)
      if (s === 1) return { s: 1, x: 0, y: 0 }
      const k = s / v.s
      return { s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k }
    })
  }, [])

  // Cambiar de lámina reinicia el zoom
  const go = useCallback(step => {
    reset()
    setLoaded(false)
    onIndex((index + step + laminas.length) % laminas.length)
  }, [index, laminas.length, onIndex, reset])

  // Bloquear el scroll de la página y enfocar "Cerrar"
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.body.style.overflow = prev }
  }, [])

  // Teclado
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === '+' || e.key === '=') zoomAt(1.4)
      else if (e.key === '-') zoomAt(1 / 1.4)
      else if (e.key === '0') reset()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose, reset, zoomAt])

  // Rueda: listener no pasivo para poder cancelar el scroll de la página
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = e => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAt])

  const local = e => {
    const r = stageRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 }
  }

  const onPointerDown = e => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, local(e))
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = Math.hypot(a.x - b.x, a.y - b.y)
    }
  }

  const onPointerMove = e => {
    if (!pointers.current.has(e.pointerId)) return
    const prev = pointers.current.get(e.pointerId)
    const p = local(e)
    pointers.current.set(e.pointerId, p)

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      zoomAt(d / pinch.current, (a.x + b.x) / 2, (a.y + b.y) / 2)
      pinch.current = d
    } else if (pointers.current.size === 1) {
      setView(v => (v.s === 1 ? v : { ...v, x: v.x + p.x - prev.x, y: v.y + p.y - prev.y }))
    }
  }

  const onPointerUp = e => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
  }

  const onDoubleClick = e => {
    if (view.s > 1) return reset()
    const p = local(e)
    zoomAt(2.5, p.x, p.y)
  }

  const count = n => String(n).padStart(2, '0')

  // Portal al body: un ancestro con transform (animación de aparición)
  // rompería el position: fixed y el visor no cubriría la ventana.
  return createPortal(
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`Plano: ${lamina.titulo}`}>
      <div className="viewer-bar">
        <p className="viewer-title">
          <span className="viewer-count">{count(index + 1)} / {count(laminas.length)}</span>
          <span>{lamina.titulo}</span>
        </p>
        <div className="viewer-tools">
          <button type="button" onClick={() => zoomAt(1 / 1.4)} aria-label="Alejar"><ZoomOut size={18} /></button>
          <span className="viewer-zoom" aria-live="polite">{Math.round(view.s * 100)}%</span>
          <button type="button" onClick={() => zoomAt(1.4)} aria-label="Acercar"><ZoomIn size={18} /></button>
          <button type="button" onClick={reset} aria-label="Ajustar a la pantalla"><Maximize size={18} /></button>
          <button type="button" ref={closeRef} onClick={onClose} className="viewer-close" aria-label="Cerrar visor"><X size={20} /></button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={`viewer-stage${view.s > 1 ? ' is-zoomed' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
      >
        {!loaded && <p className="viewer-loading">Cargando plano en alta resolución…</p>}
        <img
          key={lamina.full}
          src={lamina.full}
          alt={`Plano: ${lamina.titulo}`}
          draggable="false"
          onLoad={() => setLoaded(true)}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`, opacity: loaded ? 1 : 0 }}
        />
      </div>

      {laminas.length > 1 && (
        <>
          <button type="button" className="viewer-nav prev" onClick={() => go(-1)} aria-label="Lámina anterior"><ChevronLeft size={24} /></button>
          <button type="button" className="viewer-nav next" onClick={() => go(1)} aria-label="Lámina siguiente"><ChevronRight size={24} /></button>
        </>
      )}

      <p className="viewer-hint">Rueda o pellizco para acercar · arrastrá para moverte · doble clic para ampliar</p>
    </div>,
    document.body
  )
}
