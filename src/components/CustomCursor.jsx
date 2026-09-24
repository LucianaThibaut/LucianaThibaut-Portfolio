import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const raf     = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 1024) return

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.13
      ring.current.y += (pos.current.y - ring.current.y) * 0.13
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(loop)
    }

    const enter = (e) => {
      if (e.target instanceof Element && e.target.closest('a,button,[data-hover]') && ringRef.current)
        ringRef.current.classList.add('expanded')
    }
    const leave = (e) => {
      if (e.target instanceof Element && e.target.closest('a,button,[data-hover]') && ringRef.current)
        ringRef.current.classList.remove('expanded')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseenter', enter, true)
    document.addEventListener('mouseleave', leave, true)
    raf.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseenter', enter, true)
      document.removeEventListener('mouseleave', leave, true)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur-dot  hidden lg:block" />
      <div ref={ringRef} className="cur-ring hidden lg:block" />
    </>
  )
}
