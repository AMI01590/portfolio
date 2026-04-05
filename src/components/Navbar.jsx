import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const NAV_LINKS = [
  { href: '#home',         label: 'Home' },
  { href: '#skills',       label: 'Skills' },
  { href: '#projects',     label: 'Projects' },
  { href: '#experience',   label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact',      label: 'Contact' },
]

export default function Navbar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const pillRef = useRef(null)
  const linkRefs = useRef({})

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Move pill to active link
  useEffect(() => {
    const link = linkRefs.current[active]
    const pill = pillRef.current
    if (link && pill) {
      const { offsetLeft, offsetWidth } = link
      pill.style.left = `${offsetLeft}px`
      pill.style.width = `${offsetWidth}px`
    }
  }, [active])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        id="scroll-progress"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[1000] origin-left"
      />

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0b1326]/80 backdrop-blur-2xl shadow-[0_1px_0_rgba(70,69,84,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-headline font-bold text-xl tracking-tight text-[#dae2fd]"
          >
            <span className="text-primary">AMI</span>
            <span className="text-[#dae2fd]/50">_PANDEY</span>
          </motion.div>

          {/* Desktop nav with sliding pill */}
          <div className="hidden md:flex relative items-center gap-1">
            {/* Sliding pill background */}
            <div
              ref={pillRef}
              className="absolute h-8 rounded-full bg-primary/10 border border-primary/20 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.slice(1)
              return (
                <a
                  key={id}
                  ref={el => (linkRefs.current[id] = el)}
                  href={href}
                  className={`relative px-4 py-1.5 text-sm font-body font-medium transition-colors z-10 ${
                    active === id ? 'text-primary' : 'text-[#dae2fd]/60 hover:text-[#dae2fd]'
                  }`}
                >
                  {label}
                </a>
              )
            })}
          </div>


        </div>
      </nav>
    </>
  )
}
