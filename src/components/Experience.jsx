import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ScrambleText } from '../hooks/useScramble'

const EDUCATION = [
  {
    year: '2024–Present',
    title: 'B.Tech in CSE(AI)',
    org: 'G.L. Bajaj Institute of Technology & Management',
    detail: 'CGPA: 8.39 TILL THIRD SEM',
    accent: '#c0c1ff',
  },
  {
    year: '2023',
    title: 'Intermediate',
    org: 'MDJV(CBSE)',
    detail: 'Percentage: 87.6%',
    accent: '#3cddc7',
  },
  {
    year: '2021',
    title: 'High School',
    org: 'MDJV(CBSE)',
    detail: 'Percentage: 96%',
    accent: '#f0a0ff',
  },
]

const ACHIEVEMENTS = [
  {
    year: 'Mar 2025',
    title: 'Top 32 — Tech Trove Challenge',
    org: 'GL Bajaj Institute',
    detail: 'College-wide technical competition — ranked in top 32 participants.',
    accent: '#c0c1ff',
  },
  {
    year: 'Feb 2026',
    title: 'Student Ideathon — UnPollute 2026',
    org: 'STEP & Awaaz Leadership Labs',
    detail: '13–14 Feb 2026 · Ideathon on environmental innovation.',
    accent: '#3cddc7',
  },
]

function TimelineNode({ item, index, side }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 1, 0.5, 1] }}
      className="relative flex items-start gap-5 mb-10"
    >
      {/* Node dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.2, type: 'spring', stiffness: 260, damping: 18 }}
        className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 mt-0.5"
        style={{
          borderColor: item.accent,
          background: `${item.accent}18`,
          boxShadow: `0 0 16px ${item.accent}40`,
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.accent }} />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ x: 4 }}
        className="flex-1 p-5 rounded-xl bg-surface-container border border-outline/10 hover:border-primary/20 transition-colors"
      >
        <span
          className="text-xs font-mono uppercase tracking-widest mb-1 block"
          style={{ color: item.accent }}
        >
          {item.year}
        </span>
        <h4 className="font-headline font-bold text-on-surface text-base mb-0.5">{item.title}</h4>
        <p className="text-sm text-on-surface/50 mb-1">{item.org}</p>
        <p className="text-xs text-on-surface/40 font-mono">{item.detail}</p>
      </motion.div>
    </motion.div>
  )
}

function AnimatedTimeline({ items, title, icon }) {
  const containerRef = useRef(null)
  const lineRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: '-60px' })

  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 text-2xl font-headline font-bold text-on-surface mb-10"
      >
        <span className="material-symbols-outlined text-primary">{icon}</span>
        {title}
      </motion.h3>

      <div ref={containerRef} className="relative pl-4">
        {/* Animated vertical line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-outline/20 overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-primary via-tertiary to-primary"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformOrigin: 'top', height: '100%' }}
          />
        </div>

        {items.map((item, i) => (
          <TimelineNode key={i} item={item} index={i} side="left" />
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-5xl font-headline font-extrabold text-on-surface mb-4">
            My{' '}
            <ScrambleText text="Journey" className="text-primary" />
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="h-[2px] w-16 bg-gradient-to-r from-primary to-tertiary origin-left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <AnimatedTimeline items={EDUCATION} title="Education" icon="school" />
          <AnimatedTimeline items={ACHIEVEMENTS} title="Achievements" icon="emoji_events" />
        </div>
      </div>
    </section>
  )
}
