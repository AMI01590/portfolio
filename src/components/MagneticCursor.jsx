import { useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function MagneticCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 80, damping: 18 })
  const ringY = useSpring(cursorY, { stiffness: 80, damping: 18 })
  const isHovering = useRef(false)
  const ringRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const addHover = () => {
      isHovering.current = true
      ringRef.current?.classList.add('hovering')
    }
    const removeHover = () => {
      isHovering.current = false
      ringRef.current?.classList.remove('hovering')
    }

    document.addEventListener('mousemove', move)

    // Delegate hover detection to interactive elements
    const targets = () => document.querySelectorAll('a, button, [data-cursor-hover]')
    let cleanup = []

    const attach = () => {
      targets().forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
        cleanup.push(() => {
          el.removeEventListener('mouseenter', addHover)
          el.removeEventListener('mouseleave', removeHover)
        })
      })
    }

    // Give DOM time to mount, then attach
    const t = setTimeout(attach, 500)

    return () => {
      document.removeEventListener('mousemove', move)
      clearTimeout(t)
      cleanup.forEach(fn => fn())
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Sharp dot — follows cursor exactly */}
      <motion.div
        id="cursor-dot"
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Lagging ring */}
      <motion.div
        id="cursor-ring"
        ref={ringRef}
        style={{ x: ringX, y: ringY }}
      />
    </>
  )
}
