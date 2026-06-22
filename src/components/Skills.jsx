import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScrambleText } from '../hooks/useScramble'

const SKILL_GROUPS = [
  {
    icon: 'code', color: 'text-primary', bg: 'bg-primary/10',
    title: 'Programming',
    tags: ['C', 'C++', 'JavaScript', 'Python', 'TypeScript'],
    bars: [
      { name: 'JavaScript / TypeScript', pct: 88 },
      { name: 'Python', pct: 80 },
      { name: 'C / C++', pct: 75 },
    ],
    span: 'col-span-1'
  },
  {
    icon: 'memory', color: 'text-tertiary', bg: 'bg-tertiary/10',
    title: 'Core CS',
    tags: ['OOPs', 'Operating Systems', 'Cyber Security', 'Data Structures & Algorithms'],
    bars: [
      { name: 'Data Structures & Algorithms', pct: 82 },
      { name: 'OOPs', pct: 85 },
      { name: 'Operating Systems', pct: 75 },
    ],
    span: 'col-span-1'
  },
  {
    icon: 'devices', color: 'text-[#a855f7]', bg: 'bg-[#a855f7]/10',
    title: 'Web Development',
    tags: ['Next.js 16', 'React 19', 'Vite', 'Tailwind CSS 4.0', 'Framer Motion', 'HTML5 Canvas', 'HTML', 'CSS', 'JavaScript (ES6+)'],
    bars: [
      { name: 'React / Next.js', pct: 90 },
      { name: 'Tailwind CSS / Canvas', pct: 88 },
      { name: 'HTML5 & CSS3', pct: 92 },
    ],
    span: 'md:col-span-2'
  },
  {
    icon: 'dns', color: 'text-[#f0a0ff]', bg: 'bg-[#f0a0ff]/10',
    title: 'Backend & APIs',
    tags: ['Node.js', 'Express.js', 'Socket.io', 'REST APIs', 'JWT Authentication'],
    bars: [
      { name: 'Node.js / Express', pct: 85 },
      { name: 'REST APIs & Security', pct: 88 },
      { name: 'Socket.io', pct: 72 },
    ],
    span: 'col-span-1'
  },
  {
    icon: 'storage', color: 'text-[#3cddc7]', bg: 'bg-[#3cddc7]/10',
    title: 'Database',
    tags: ['PostgreSQL', 'Prisma ORM'],
    bars: [
      { name: 'PostgreSQL', pct: 80 },
      { name: 'Prisma ORM', pct: 85 },
    ],
    span: 'col-span-1'
  },
  {
    icon: 'cloud', color: 'text-[#ff8080]', bg: 'bg-[#ff8080]/10',
    title: 'Cloud & Media',
    tags: ['Cloudinary', 'Railway', 'Vercel'],
    bars: [
      { name: 'Vercel / Railway', pct: 88 },
      { name: 'Cloudinary', pct: 82 },
    ],
    span: 'col-span-1'
  },
  {
    icon: 'handyman', color: 'text-[#ffb86c]', bg: 'bg-[#ffb86c]/10',
    title: 'Tools & Platforms',
    tags: ['Git', 'GitHub', 'Linux', 'Figma'],
    bars: [
      { name: 'Git & GitHub', pct: 90 },
      { name: 'Linux / Figma', pct: 78 },
    ],
    span: 'col-span-1'
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.title}
              variants={cardVariant}
              className={`p-8 rounded-2xl bg-surface-container border border-outline/10 hover:border-primary/20 transition-colors group ${group.span || ''}`}
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
