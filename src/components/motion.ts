import type { Variants } from 'framer-motion'

// Shared scroll-reveal variants used across pages for a consistent feel.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

export const viewportOnce = { once: true, margin: '-80px' } as const
