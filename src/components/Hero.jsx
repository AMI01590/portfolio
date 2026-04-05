import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import { useScramble } from '../hooks/useScramble'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
}

function TypingTerminal() {
  const lines = [
    { text: '$ whoami', cls: 'text-tertiary font-mono text-sm', delay: 40 },
    { text: 'Ami Pandey — CS(AI) @ GL Bajaj', cls: 'text-on-surface/80 font-mono text-sm', delay: 30 },
    { text: '$ skills --list', cls: 'text-tertiary font-mono text-sm mt-3', delay: 40 },
    { text: 'Web Dev · Cybersecurity · AI/ML · Cloud', cls: 'text-primary font-mono text-sm', delay: 25 },
    { text: '$ status', cls: 'text-tertiary font-mono text-sm mt-3', delay: 50 },
    { text: '✓ Open to opportunities', cls: 'text-[#3cddc7] font-mono text-sm', delay: 30 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-surface-container border border-outline/20 rounded-xl p-6 font-mono text-sm space-y-1 relative overflow-hidden"
    >
      <div className="flex gap-1.5 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
      </div>
      {lines.map((l, i) => (
        <TypingLine key={i} line={l} startDelay={i * 600 + 800} />
      ))}
    </motion.div>
  )
}

function TypingLine({ line, startDelay }) {
  const { text, cls, delay } = line
  const [displayed, setDisplayed] = React.useState('')
  const [started, setStarted] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  React.useEffect(() => {
    if (!started) return
    let i = 0
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, ++i))
      if (i >= text.length) clearInterval(iv)
    }, delay)
    return () => clearInterval(iv)
  }, [started, text, delay])

  if (!started && displayed === '') return <p className={cls}>&nbsp;</p>
  return <p className={cls}>{displayed}<span className={displayed.length < text.length ? 'animate-pulse' : 'hidden'}>|</span></p>
}

import React from 'react'

export default function Hero() {
  const heading1 = useScramble('Building Secure', true, 25)
  const heading2 = useScramble('Digital Futures', true, 25)

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-16 relative overflow-hidden"
    >
      <ParticleCanvas />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/6 blur-[120px] rounded-full float-orb pointer-events-none" style={{zIndex:1}} />
      <div className="absolute bottom-1/3 -right-24 w-80 h-80 bg-tertiary/6 blur-[100px] rounded-full float-orb-r pointer-events-none" style={{zIndex:1}} />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center" style={{position:'relative',zIndex:2}}>
        {/* Left — text */}
        <motion.div
          className="lg:col-span-7 space-y-8"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="space-y-2">
            <h1 className="font-headline font-extrabold text-6xl lg:text-7xl text-on-surface leading-[1.05]">
              {heading1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                {heading2}
              </span>
            </h1>
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-on-surface/60 leading-relaxed max-w-xl font-body">
            CS (AI) student at GL Bajaj · Web Developer · Cybersecurity Enthusiast.
            I build systems where every connection is authenticated and every line of code matters.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-[#0b1326] font-semibold text-sm font-body"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="px-7 py-3 rounded-xl border border-primary/30 text-primary font-semibold text-sm font-body hover:bg-primary/5 transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex gap-10 pt-2">
            {[['8.39', 'CGPA'], ['Top 32', 'College Tech']].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="text-3xl font-headline font-bold text-primary">{val}</p>
                <p className="text-xs font-mono uppercase tracking-widest text-on-surface/40">{lbl}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — terminal */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25,1,0.5,1] }}
        >
          <TypingTerminal />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface/30">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-on-surface/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-on-surface/40 scroll-dot" />
        </div>
      </div>
    </section>
  )
}
