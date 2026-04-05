import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

export function useScramble(text, trigger = true, speed = 30) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!trigger) { setDisplay(text); return }

    let iteration = 0
    const totalFrames = text.length * 3

    const animate = () => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (i < iteration / 3) return char
            if (char === ' ') return ' '
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration++
      if (iteration < totalFrames) {
        raf.current = requestAnimationFrame(animate)
      } else {
        setDisplay(text)
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [text, trigger])

  return display
}

// Component version with IntersectionObserver trigger
export function ScrambleText({ text, className = '', tag: Tag = 'span' }) {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const display = useScramble(text, triggered)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return <Tag ref={ref} className={className}>{display}</Tag>
}
