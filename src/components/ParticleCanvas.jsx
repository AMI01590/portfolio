import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    const N = 80, CONNECT = 130, MDIST = 170, MSPEED = 2
    let W, H, particles = [], raf

    const resize = () => {
      W = canvas.width = canvas.parentElement.offsetWidth
      H = canvas.height = canvas.parentElement.offsetHeight
      particles = Array.from({ length: N }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.8 + 0.8, a: Math.random() * 0.5 + 0.3
      }))
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      const mx = mouse.x, my = mouse.y
      for (let i = 0; i < N; i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        const dx = p.x - mx, dy = p.y - my
        const dm = Math.hypot(dx, dy)
        if (dm < MDIST) {
          const f = (MDIST - dm) / MDIST
          p.vx += (dx / dm) * f * 0.3; p.vy += (dy / dm) * f * 0.3
          const sp = Math.hypot(p.vx, p.vy)
          if (sp > MSPEED) { p.vx = p.vx / sp * MSPEED; p.vy = p.vy / sp * MSPEED }
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(60,221,199,${p.a})`
          ctx.fill()
        } else {
          p.vx *= 0.99; p.vy *= 0.99
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(192,193,255,${p.a})`
          ctx.fill()
        }
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < CONNECT) {
            const op = (1 - d / CONNECT) * 0.3
            const near = Math.hypot((particles[i].x + particles[j].x) / 2 - mx, (particles[i].y + particles[j].y) / 2 - my) < MDIST
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = near ? `rgba(60,221,199,${op * 1.8})` : `rgba(192,193,255,${op})`
            ctx.lineWidth = near ? 0.7 : 0.3
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    canvas.parentElement.addEventListener('mousemove', onMove)
    canvas.parentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', resize)
    resize(); loop()

    return () => {
      cancelAnimationFrame(raf)
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
