import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import tribeLogo from '../assets/Tribe logo.png'

const outerShadow = 'shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]'
const MotionLink = motion(Link)

// The source asset is a single white PNG, so on light backgrounds it's
// inverted (white -> black) via CSS filter instead of swapping images.
export default function Nav({ textColor = '#1e1e1a', logoInvert = 1 }) {
  const logoFilter = useMotionTemplate`invert(${logoInvert})`

  // The whole bar slides away on scroll-down (out of the reader's way) and
  // slides back the moment they scroll up, even a little — a direction
  // change, not a distance threshold.
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY.current
    if (Math.abs(diff) > 4) {
      setHidden(diff > 0)
      lastY.current = latest
    }
  })

  return (
    <motion.header
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 right-0 z-20 grid grid-cols-3 items-center px-8 py-8 md:px-12"
    >
      <MotionLink to="/" className="justify-self-start">
        <motion.img src={tribeLogo} alt="tr/be" className="h-12 w-auto" style={{ filter: logoFilter }} />
      </MotionLink>

      <nav
        className={`glass-border hidden items-center justify-self-center gap-1 rounded-full bg-white/20 p-0 backdrop-blur-xl md:flex ${outerShadow}`}
      >
        <MotionLink
          to="/about"
          style={{ color: textColor }}
          className="rounded-full px-6 py-5 font-gsans text-base font-semibold leading-6 transition-colors hover:bg-white/20"
        >
          About us
        </MotionLink>
        <MotionLink
          to="/contact"
          style={{ color: textColor }}
          className="rounded-full px-6 py-5 font-gsans text-base font-semibold leading-6 transition-colors hover:bg-white/20"
        >
          Contact us
        </MotionLink>
      </nav>

      <motion.a
        href="#app"
        style={{ color: textColor }}
        className={`glass-border justify-self-end whitespace-nowrap rounded-full bg-white/20 px-4 py-3 font-gsans text-sm font-semibold leading-6 backdrop-blur-xl transition-colors hover:bg-white/30 md:px-6 md:py-5 md:text-base ${outerShadow}`}
      >
        Get the app
      </motion.a>
    </motion.header>
  )
}
