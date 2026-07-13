import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] } }
}

const TRAITS = [
  { icon: 'security', label: 'Security-First Mindset', color: 'text-primary' },
  { icon: 'psychology', label: 'Problem Solver', color: 'text-tertiary' },
  { icon: 'hub', label: 'Systems Thinker', color: 'text-[#f0a0ff]' },
  { icon: 'rocket_launch', label: 'Always Shipping', color: 'text-[#ffd080]' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-surface-low">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left text */}
          <div className="space-y-6">
            <motion.div variants={item}>
              <span className="text-xs font-mono uppercase tracking-widest text-tertiary">About Me</span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface mt-2">
                Behind the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                  Code
                </span>
              </h2>
            </motion.div>

            <motion.p variants={item} className="text-on-surface/70 leading-relaxed text-lg">
              As a Computer Science (AI) student at GL Bajaj, I've transformed my curiosity for how systems
              work into a passion for building them securely. I'm a natural problem-solver who thrives at the
              intersection of backend logic and defensive security.
            </motion.p>

            <motion.p variants={item} className="text-on-surface/60 leading-relaxed">
              My focus lies in architecting robust digital environments where every line of code serves a
              purpose and every connection is authenticated. Whether it's developing AI-driven solutions or
              hardening web servers, I approach every challenge with a security-first mindset.
            </motion.p>

            {/* Stat chips */}
            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              {[
                ['8.39', 'B.Tech CGPA'],
                ['Top 32', 'College Tech Challenge'],
              ].map(([val, lbl]) => (
                <div
                  key={lbl}
                  className="px-5 py-3 rounded-2xl bg-surface-container border border-outline/10"
                >
                  <p className="text-2xl font-headline font-bold text-primary">{val}</p>
                  <p className="text-xs font-mono uppercase tracking-widest text-on-surface/40">{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — trait grid */}
          <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
            {TRAITS.map((t) => (
              <motion.div
                key={t.label}
                variants={item}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-2xl bg-surface-container border border-outline/10 hover:border-primary/20 transition-colors flex flex-col gap-3"
              >
                <span className={`material-symbols-outlined text-2xl ${t.color}`}>{t.icon}</span>
                <p className="font-body font-semibold text-on-surface text-sm leading-snug">{t.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
