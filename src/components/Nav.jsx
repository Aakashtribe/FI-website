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
      <MotionLink href="/" className="justify-self-start">
        <motion.img src={tribeLogo} alt="tr/be" className="h-12 w-auto" style={{ filter: logoFilter }} />
      </MotionLink>

      <nav
        className={`glass-border hidden items-center justify-self-center gap-1 rounded-full bg-white/35 p-0 backdrop-blur-2xl lg:flex ${outerShadow}`}
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

      {/* Below lg there's no room for the pill nav (and its own "Get the
          app" pill), so a hamburger opens both — plus its own "Get the
          app" button — in a dropdown instead of them just disappearing. */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        className={`glass-border col-start-3 flex h-12 w-12 items-center justify-center justify-self-end rounded-full bg-white/35 backdrop-blur-2xl transition-colors hover:bg-white/45 lg:hidden ${outerShadow}`}
      >
        <MenuIcon open={menuOpen} color={textColor} />
      </button>

      <motion.a
        href={appStoreLink}
        target="_blank"
        rel="noreferrer"
        style={{ color: textColor }}
        className={`glass-border hidden justify-self-end whitespace-nowrap rounded-full bg-white/35 px-4 py-3 font-gsans text-sm font-semibold leading-6 backdrop-blur-2xl transition-colors hover:bg-white/45 lg:inline-block lg:px-6 lg:py-5 lg:text-base ${outerShadow}`}
      >
        Get the app
      </motion.a>

      {/* Fixed (not absolute) so its inset-x-6 matches the bottom "Get the
          app" button's margins exactly — as a grid child, an absolutely
          positioned panel here would resolve its width/position against
          the grid's own content box (inside the header's px-8 padding),
          landing 32px further in than a plain viewport-relative inset.
          z-30 (above the header's own z-20) because Hero's headline sits
          at that same z-20 — as a later-painted DOM sibling at an equal
          z-index it would otherwise win over this panel regardless of the
          header's stacking. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`glass-border !fixed inset-x-6 top-[92px] z-30 flex flex-col overflow-hidden rounded-3xl bg-white/90 backdrop-blur-2xl lg:hidden ${outerShadow}`}
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

      {/* "Get the app" pinned to the bottom of the screen while the menu is
          open, rather than sitting inside the small links card — matches
          the reference layout (nav links up top, app CTA anchored low). */}
      <AnimatePresence>
        {menuOpen && (
          <motion.a
            href={appStoreLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-6 bottom-6 z-30 flex items-center justify-center rounded-full bg-[#1e1e1a] py-4 font-gsans text-base font-semibold text-white shadow-xl transition-colors hover:bg-[#33322c] lg:hidden"
          >
            Get the app
          </motion.a>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
