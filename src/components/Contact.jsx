import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScrambleText } from '../hooks/useScramble'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] } }
}

const LINKS = [
  {
    icon: 'mail',
    label: 'Email',
    value: 'pandeyami915@gmail.com',
    href: 'mailto:pandeyami915@gmail.com',
  },
  {
    icon: 'location_on',
    label: 'Location',
    value: 'Greater Noida, India',
    href: null,
  },
  {
    icon: 'link',
    label: 'LinkedIn',
    value: 'ami-pandey-422604222',
    href: 'https://www.linkedin.com/in/ami-pandey-422604222/',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="relative rounded-3xl bg-surface-container border border-outline/10 overflow-hidden p-14 text-center"
        >
          {/* Ambient glows */}
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary/6 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-tertiary/6 blur-[90px] rounded-full pointer-events-none" />

          <motion.div variants={item}>
            <span className="text-xs font-mono uppercase tracking-widest text-tertiary mb-4 block">Get in touch</span>
            <h2 className="text-5xl font-headline font-extrabold text-on-surface mb-4">
              Let's Secure the{' '}
              <ScrambleText text="Future" className="text-primary" />{' '}
              Together
            </h2>
            <p className="text-lg text-on-surface/50 max-w-xl mx-auto">
              Currently open to opportunities in Web Development and Cybersecurity.
              Reach out for collaborations or a technical chat.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            className="flex flex-col md:flex-row items-center justify-center gap-10 mt-14"
          >
            {LINKS.map((l) => (
              <motion.div key={l.label} variants={item}>
                {l.href ? (
                  <motion.a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-4 group"
                  >
                    <ContactIcon icon={l.icon} />
                    <ContactInfo label={l.label} value={l.value} />
                  </motion.a>
                ) : (
                  <div className="flex items-center gap-4">
                    <ContactIcon icon={l.icon} />
                    <ContactInfo label={l.label} value={l.value} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-12">
            <motion.a
              href="mailto:pandeyami915@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dim text-[#0b1326] font-headline font-bold text-base"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
              Send a Message
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactIcon({ icon }) {
  return (
    <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center border border-outline/20 group-hover:border-primary/40 transition-all text-on-surface/60 group-hover:text-primary">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
  )
}

function ContactInfo({ label, value }) {
  return (
    <div className="text-left">
      <p className="text-xs font-mono uppercase tracking-widest text-on-surface/35 mb-0.5">{label}</p>
      <p className="font-body font-semibold text-on-surface">{value}</p>
    </div>
  )
}
