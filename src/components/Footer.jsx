import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-outline/10 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-headline font-bold text-on-surface/80">
            <span className="text-primary">AMI</span>_PANDEY
          </p>
          <p className="text-xs font-mono text-on-surface/30 mt-1">© 2025 · All rights reserved</p>
        </div>

        <div className="flex gap-8 font-mono text-sm">
          {[
            ['LinkedIn', 'https://www.linkedin.com/in/ami-pandey-422604222/'],
            ['GitHub', 'https://github.com/AMI01590'],
            ['Email', 'mailto:pandeyami915@gmail.com'],
          ].map(([label, href]) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              whileHover={{ y: -2 }}
              className="text-on-surface/40 hover:text-primary transition-colors"
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
