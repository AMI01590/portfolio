import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScrambleText } from '../hooks/useScramble'

const PROJECTS = [
  {
    title: 'Simon Game',
    desc: 'Classic memory-based Simon Game with interactive feedback, sound integration, and level progression tracking.',
    tags: ['JavaScript', 'jQuery', 'DOM Animation', 'Game Logic'],
    link: 'https://ami01590.github.io/Simon-game/',
    accent: '#3cddc7',
    icon: '💡',
  },
  {
    title: 'Drum Kit',
    desc: 'Digital instrument simulator utilizing keyboard event listeners for real-time low-latency audio playback.',
    tags: ['Web Audio API', 'HTML5', 'ES6'],
    link: 'https://ami01590.github.io/Drum-kit-website/',
    accent: '#ff8080',
    icon: '🥁',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}
const card = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] } }
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="projects" className="py-28 bg-[#0d1528]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-5xl font-headline font-extrabold text-on-surface mb-4">
            <ScrambleText text="Projects" className="text-primary" />
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="h-[2px] w-16 bg-gradient-to-r from-primary to-tertiary origin-left"
          />
        </div>

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const { title, desc, tags, link, accent, icon } = project

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6, rotateX: 2 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative bg-surface-container border border-outline/10 rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Gradient top strip */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${accent}80, transparent)` }}
      />

      {/* Icon area */}
      <div className="px-8 pt-8 pb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-headline font-bold text-on-surface mb-2">{title}</h3>
        <p className="text-sm text-on-surface/60 leading-relaxed">{desc}</p>
      </div>

      {/* Tags */}
      <div className="px-8 pb-4 flex flex-wrap gap-2">
        {tags.map(t => (
          <span
            key={t}
            className="px-2.5 py-1 text-xs font-mono rounded-md bg-on-surface/5 text-on-surface/50"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer link */}
      <div className="mt-auto px-8 py-5 border-t border-outline/10">
        <motion.a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm font-semibold font-body transition-colors"
          style={{ color: accent }}
          whileHover={{ x: 4 }}
        >
          View Live
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
        </motion.a>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${accent}0a` }}
      />
    </motion.div>
  )
}
