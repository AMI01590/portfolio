import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ScrambleText } from '../hooks/useScramble'

const CERTS = [
  {
    id: 'hack-defense-2026',
    title: 'Hack Defense Summit 2026',
    issuer: 'Sohang Education',
    date: '15 Feb 2026',
    tag: 'Security',
    tagColor: '#3cddc7',
    icon: 'security',
    gradient: 'from-tertiary/20 to-tertiary/5',
    desc: 'Awarded for participation in the Hack Defense Summit 2026 hosted by Sohang Education.',
    originalUrl: '/certificates/hack-defense-2026.png',
  },
  {
    id: 'python-udemy',
    title: 'The Complete Python Bootcamp',
    issuer: 'Udemy · Jose Portilla',
    date: 'Aug 2025',
    tag: 'Development',
    tagColor: '#c0c1ff',
    icon: 'terminal',
    gradient: 'from-primary/20 to-primary/5',
    desc: 'Mastered Python from zero to hero, including data structures, OOP, and real-world scripting applications.',
    originalUrl: '/certificates/python-udemy.png',
  },
  {
    id: 'sql-udemy',
    title: 'The Complete SQL Bootcamp',
    issuer: 'Udemy · Jose Portilla',
    date: 'Feb 2026',
    tag: 'Database',
    tagColor: '#ffd080',
    icon: 'table_chart',
    gradient: 'from-yellow-400/15 to-yellow-400/5',
    desc: 'Advanced SQL training covering database design, query optimization, and complex data manipulation.',
    originalUrl: '/certificates/sql-udemy.png',
  },
  {
    id: 'ideathon-2026',
    title: 'Student Ideathon — UnPollute 2026',
    issuer: 'STEP & Awaaz Leadership Labs',
    date: 'Feb 2026',
    tag: 'Ideathon',
    tagColor: '#f0a0ff',
    icon: 'lightbulb',
    gradient: 'from-purple-400/20 to-purple-400/5',
    desc: 'Participation in the high-impact environmental innovation ideathon focused on sustainability solutions.',
    originalUrl: '/certificates/ideathon-2026.png',
  },
  {
    id: 'build-with-gemini',
    title: 'Build With Gemini — Prototype submission',
    issuer: 'DU Cluster Innovation Centre & Unstop',
    date: 'Mar 2026',
    tag: 'AI Track',
    tagColor: '#3cddc7',
    icon: 'robot',
    gradient: 'from-tertiary/20 to-tertiary/5',
    desc: 'Submission of an AI prototype and demo video for the Build With Gemini challenge track.',
    originalUrl: '/certificates/build-with-gemini.png',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
}

export default function Certificates() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="certificates" className="py-28 bg-[#0d1528]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-5xl font-headline font-extrabold text-on-surface mb-4">
            <ScrambleText text="Certificates" className="text-primary" />
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="h-[2px] w-20 bg-gradient-to-r from-primary to-tertiary origin-left"
          />
          <p className="text-on-surface/50 font-mono text-sm mt-4">Click any certificate to expand</p>
        </div>

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CERTS.map((cert) => (
            <motion.div
              key={cert.id}
              layoutId={`cert-${cert.id}`}
              variants={card}
              onClick={() => setSelected(cert)}
              whileHover={{ y: -6 }}
              className={`cursor-pointer relative rounded-2xl bg-gradient-to-br ${cert.gradient} border border-outline/10 hover:border-primary/25 overflow-hidden p-6 group`}
              style={{ willChange: 'transform' }}
            >
              {/* Icon */}
              <motion.div layoutId={`cert-icon-${cert.id}`} className="w-12 h-12 rounded-xl bg-surface/50 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined" style={{ color: cert.tagColor }}>{cert.icon}</span>
              </motion.div>

              {/* Tag */}
              <motion.span
                layoutId={`cert-tag-${cert.id}`}
                className="inline-block text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                style={{ color: cert.tagColor, background: `${cert.tagColor}15`, border: `1px solid ${cert.tagColor}30` }}
              >
                {cert.tag}
              </motion.span>

              <motion.h4 layoutId={`cert-title-${cert.id}`} className="font-headline font-bold text-on-surface text-lg mb-1">{cert.title}</motion.h4>
              <motion.p layoutId={`cert-issuer-${cert.id}`} className="text-sm text-on-surface/50 mb-1">{cert.issuer}</motion.p>
              <motion.p layoutId={`cert-date-${cert.id}`} className="text-xs font-mono text-on-surface/35">{cert.date}</motion.p>

              {/* Expand hint */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-on-surface/40" style={{ fontSize: 18 }}>open_in_full</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`cert-${selected.id}`}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl mx-4 rounded-3xl bg-surface-container border border-outline/20 shadow-2xl overflow-hidden"
            >
              {/* Image Preview Area */}
              <div className="relative h-64 sm:h-96 bg-surface flex items-center justify-center overflow-hidden border-b border-outline/10">
                <div className={`absolute inset-0 bg-gradient-to-br ${selected.gradient} opacity-20`} />
                <img
                  src={selected.originalUrl}
                  alt={selected.title}
                  className="relative z-10 max-h-full max-w-full object-contain p-4 transition-transform duration-500 hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback text when image is 404 */}
                <div className="hidden flex-col items-center gap-4 text-on-surface/20 z-10 p-8 text-center animate-pulse">
                  <span className="material-symbols-outlined" style={{ fontSize: 48 }}>image_not_supported</span>
                  <p className="text-xs font-mono max-w-md">
                    To see your certificate here, please save it as:<br/>
                    <strong className="text-primary">{selected.originalUrl}</strong>
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0b1326]/80 backdrop-blur-md flex items-center justify-center text-on-surface/80 hover:text-on-surface transition-all z-20 border border-outline/20"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-outline/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl" style={{ color: selected.tagColor }}>{selected.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-headline font-bold text-on-surface leading-tight">{selected.title}</h3>
                      <p className="text-on-surface/50 font-body text-sm mt-0.5">{selected.issuer} · {selected.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono border border-outline/20 text-on-surface/40 uppercase tracking-widest bg-surface/50">
                    {selected.tag}
                  </span>
                </div>

                <p className="text-on-surface/60 font-body leading-relaxed mb-10 text-base border-t border-outline/10 pt-8">
                  {selected.desc}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-on-surface/20">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                    Verified Certificate
                  </div>
                  <a
                    href={selected.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-[#0b1326] font-headline font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20"
                  >
                    View Full Resolution
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
