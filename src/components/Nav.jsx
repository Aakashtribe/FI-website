import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import tribeLogo from '../assets/Tribe logo.png'
import { useAppStoreLink } from '../appLinks.js'

const outerShadow = 'shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]'
const MotionLink = motion(Link)

// `color` is the same scroll-driven MotionValue passed to the text links —
// bound via style (not a plain prop) so it updates live like they do.
function MenuIcon({ open, color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      {open ? (
        <motion.path d="M6 6l12 12M18 6L6 18" style={{ stroke: color }} strokeWidth="2" strokeLinecap="round" />
      ) : (
        <motion.path d="M4 7h16M4 12h16M4 17h16" style={{ stroke: color }} strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  )
}

// The source asset is a single white PNG, so on light backgrounds it's
// inverted (white -> black) via CSS filter instead of swapping images.
export default function Nav({ textColor = '#1e1e1a', logoInvert = 1 }) {
  const logoFilter = useMotionTemplate`invert(${logoInvert})`
  const appStoreLink = useAppStoreLink()

  // The whole bar slides away on scroll-down (out of the reader's way) and
  // slides back the moment they scroll up, even a little — a direction
  // change, not a distance threshold.
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY.current
    if (Math.abs(diff) > 4) {
      setHidden(diff > 0)
      if (diff > 0) setMenuOpen(false)
      lastY.current = latest
    }
  })

  return (
    <motion.header
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 right-0 z-20 grid grid-cols-3 items-center px-8 py-8 md:px-12"
    >
      <MotionLink
        href="/"
        className={`glass-border flex h-12 items-center justify-center justify-self-start whitespace-nowrap rounded-full bg-white/35 px-4 backdrop-blur-2xl transition-colors hover:bg-white/45 md:h-16 md:px-6 ${outerShadow}`}
      >
        <motion.img src={tribeLogo} alt="tr/be" className="h-7 w-auto md:h-9" style={{ filter: logoFilter }} />
      </MotionLink>

      <nav
        className={`glass-border hidden items-center justify-self-center gap-1 rounded-full bg-white/35 p-0 backdrop-blur-2xl md:flex ${outerShadow}`}
      >
        <MotionLink
          href="/about"
          style={{ color: textColor }}
          className="whitespace-nowrap rounded-full px-6 py-5 font-gsans text-base font-semibold leading-6 transition-colors hover:bg-white/20"
        >
          About us
        </MotionLink>
        <MotionLink
          href="/contact"
          style={{ color: textColor }}
          className="whitespace-nowrap rounded-full px-6 py-5 font-gsans text-base font-semibold leading-6 transition-colors hover:bg-white/20"
        >
          Contact us
        </MotionLink>
      </nav>

      {/* Below md there's no room for the pill nav, so a hamburger opens the
          same two links in a dropdown instead of them just disappearing. */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        className={`glass-border flex h-12 w-12 items-center justify-center justify-self-center rounded-full bg-white/35 backdrop-blur-2xl transition-colors hover:bg-white/45 md:hidden ${outerShadow}`}
      >
        <MenuIcon open={menuOpen} color={textColor} />
      </button>

      <motion.a
        href={appStoreLink}
        target="_blank"
        rel="noreferrer"
        style={{ color: textColor }}
        className={`glass-border justify-self-end whitespace-nowrap rounded-full bg-white/35 px-4 py-3 font-gsans text-sm font-semibold leading-6 backdrop-blur-2xl transition-colors hover:bg-white/45 md:px-6 md:py-5 md:text-base ${outerShadow}`}
      >
        Get the app
      </motion.a>

      {/* Placed after every other grid child — col-span-3 makes this occupy
          a full row, which would otherwise push whatever comes after it
          (Get the app) down into a new row of its own. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -8, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className={`glass-border absolute left-1/2 top-full col-span-3 mt-3 flex w-[calc(100%_-_4rem)] max-w-xs flex-col overflow-hidden rounded-3xl bg-white/90 backdrop-blur-2xl md:hidden ${outerShadow}`}
          >
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 text-center font-gsans text-base font-semibold text-[#1e1e1a] transition-colors hover:bg-black/5"
            >
              About us
            </Link>
            <div className="h-px bg-black/10" />
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 text-center font-gsans text-base font-semibold text-[#1e1e1a] transition-colors hover:bg-black/5"
            >
              Contact us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
