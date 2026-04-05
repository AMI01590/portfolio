import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScrambleText } from '../hooks/useScramble'

const SKILL_GROUPS = [
  {
    icon: 'devices', color: 'text-primary', bg: 'bg-primary/10',
    title: 'Frontend',
    tags: ['HTML', 'CSS', 'JavaScript (ES6+)', 'React', 'Tailwind CSS'],
    bars: [
      { name: 'HTML/CSS', pct: 90 },
      { name: 'JavaScript', pct: 78 },
      { name: 'React', pct: 70 },
      { name: 'Tailwind', pct: 82 },
    ]
  },
  {
    icon: 'dns', color: 'text-tertiary', bg: 'bg-tertiary/10',
    title: 'Backend & Cloud',
    tags: ['Python', 'Node.js', 'Express.js', 'MySQL', 'AWS', 'GitHub'],
    bars: [
      { name: 'Python', pct: 80 },
      { name: 'Node / Express', pct: 68 },
      { name: 'MySQL', pct: 72 },
      { name: 'AWS', pct: 55 },
    ]
  },
  {
    icon: 'security', color: 'text-[#f0a0ff]', bg: 'bg-purple-400/10',
    title: 'Security',
    tags: ['Linux', 'Wireshark'],
    bars: [
      { name: 'Linux Admin', pct: 80 },
      { name: 'Wireshark Analysis', pct: 70 },
    ]
  },
]

function SkillBar({ name, pct, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between text-xs font-mono text-on-surface/60">
        <span>{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
        >{pct}%</motion.span>
      </div>
      <div className="h-1.5 rounded-full bg-on-surface/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-tertiary"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.25, 1, 0.5, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
}
const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-5xl font-headline font-extrabold text-on-surface mb-4">
            Technical{' '}
            <ScrambleText text="Arsenal" className="text-primary" />
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="h-[2px] w-20 bg-gradient-to-r from-primary to-tertiary origin-left"
          />
        </div>

        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.title}
              variants={cardVariant}
              className="p-8 rounded-2xl bg-surface-container border border-outline/10 hover:border-primary/20 transition-colors group"
            >
              <div className={`w-11 h-11 rounded-xl ${group.bg} flex items-center justify-center ${group.color} mb-6 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined">{group.icon}</span>
              </div>
              <h3 className="text-xl font-headline font-bold mb-5 text-on-surface">{group.title}</h3>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {group.tags.map(t => (
                  <span
                    key={t}
                    className="skill-tag px-3 py-1 rounded-full bg-secondary-container text-on-secondary text-xs font-mono cursor-default transition-all"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Animated bars */}
              <div className="space-y-3 border-t border-outline/10 pt-5">
                {group.bars.map((bar, i) => (
                  <SkillBar key={bar.name} {...bar} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
