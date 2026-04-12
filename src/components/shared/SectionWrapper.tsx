// SectionWrapper.tsx — reusable whileInView entrance animation wrapper
// Usage: <SectionWrapper delay={0.2} direction="left">...</SectionWrapper>
// direction: 'up' (default) | 'left' | 'right'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  direction?: Direction
}

function getInitial(direction: Direction) {
  switch (direction) {
    case 'left':  return { opacity: 0, x: -30, y: 0,  scale: 0.96 }
    case 'right': return { opacity: 0, x:  30, y: 0,  scale: 0.96 }
    default:      return { opacity: 0, x:   0, y: 40, scale: 0.96 }
  }
}

export default function SectionWrapper({ children, delay = 0, className = '', direction = 'up' }: Props) {
  return (
    <motion.div
      initial={getInitial(direction)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
