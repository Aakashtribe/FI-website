import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Nav from './Nav.jsx'
import PhoneMockup from './PhoneMockup.jsx'

// Must match the mockup box in PhoneMockup.jsx (w-[220px] md:w-[260px], same aspect ratio
// as the source PNG, 2229x4527).
const BASE_WIDTH_MOBILE = 220
const BASE_WIDTH_DESKTOP = 260
const CONTAINER_ASPECT = 2229 / 4527
// Fraction of the mockup box the phone's screen (not its bezel/frame) actually
// occupies — the narrower of the screen box's width/height fill (measured in
// PhoneMockup.jsx's SCREEN constant) is the binding one for "huge intro" coverage.
const SCREEN_FILL_RATIO = 0.9264
// Extra safety margin so the screen clears the viewport edge with room to spare
// (otherwise viewport aspect ratios close to the phone's own can let the notch peek in).
const COVER_BUFFER = 1.15

export default function Hero() {
  const sectionRef = useRef(null)
  const [coverScale, setCoverScale] = useState(5)

  useEffect(() => {
    const computeCoverScale = () => {
      const baseWidth = window.innerWidth < 768 ? BASE_WIDTH_MOBILE : BASE_WIDTH_DESKTOP
      const baseHeight = baseWidth / CONTAINER_ASPECT
      setCoverScale(
        (Math.max(window.innerWidth / baseWidth, window.innerHeight / baseHeight) / SCREEN_FILL_RATIO) *
          COVER_BUFFER
      )
    }
    computeCoverScale()
    window.addEventListener('resize', computeCoverScale)
    return () => window.removeEventListener('resize', computeCoverScale)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // The hand-off to the shrunk white chat UI now begins on the very first
  // scroll input, rather than holding the huge blue intro first — it still
  // plays out over a slow, multi-scroll stretch (the same 0.4 width as
  // before) rather than snapping instantly.
  const TRANSITION_START = 0
  const TRANSITION_END = 0.4

  const bgOpacity = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_START + 0.1], [1, 0])
  const navTextColor = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_END], ['#ffffff', '#1e1e1a'])
  // The logo is a single white PNG, so it's inverted (white -> black) over the
  // same range navTextColor crosses over, instead of swapping image assets.
  const logoInvert = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_END], [0, 1])

  const headlineOpacity = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_START + 0.1], [1, 0])
  const headlineY = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_START + 0.12], [0, -20])

  // Phone starts huge (screen fills the viewport, no bezel visible) and squeezes
  // down to its normal chat-interface size — then just holds there. No zoom back
  // up, no fade-out: it stops once settled, and FindMoney starts right below.
  const phoneScale = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_END], [coverScale, 1])

  // The hand-off to white/chat rides right alongside the phone settling, over
  // the same slow stretch — no lingering half-blue gap once it's done.
  const chatContentOpacity = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_END], [0, 1])
  // The phone's screen shows a blue sky photo at rest (behind the headline), which
  // fades out right as the chat content fades in — a hand-off, not an overlap.
  const skyOpacity = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_END], [1, 0])
  // The phone's own drawn status-row text crossfades in color right alongside
  // that same hand-off, same trick as navTextColor above.
  const statusBarColor = useTransform(scrollYProgress, [TRANSITION_START, TRANSITION_END], ['#ffffff', '#1e1e1a'])
  // The chat itself is scroll-scrubbed, not timer-driven: it starts partway
  // through the phone's hand-off (so it isn't running illegibly while still
  // huge) and plays out continuously across the rest of the scroll, holding
  // briefly at fully-typed before FindMoney takes over. Whatever scroll
  // position you stop at is exactly what's shown — nothing keeps animating
  // on its own after you stop, and scrolling back up rewinds it.
  const chatStartPoint = TRANSITION_START + 0.5 * (TRANSITION_END - TRANSITION_START)
  const chatActive = useTransform(scrollYProgress, [chatStartPoint, 0.95], [0, 1])

  return (
    <section ref={sectionRef} className="relative h-[160vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-white">
        <motion.div
          style={{
            opacity: bgOpacity,
            backgroundImage:
              'linear-gradient(180deg, rgba(135,206,235,0.02) 0%, rgba(135,206,235,0.08) 30%, rgba(135,206,235,0.14) 55%, rgba(135,206,235,0) 100%)',
          }}
          animate={{ y: [0, -18, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 z-0 h-full w-full"
        />

        <Nav textColor={navTextColor} logoInvert={logoInvert} />

        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="relative z-20 flex flex-col items-center px-6 text-center"
        >
          <h1 className="max-w-6xl text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-white">
            Your personal finance companion
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70 md:text-lg">
            tr/be works on your money 24x7, so you can focus on your career, your health and your sleep.
          </p>
        </motion.div>

        {/* Truly centered — floats in the middle of the frame with room above and
            below once settled, rather than sitting flush against any edge. The nav
            (z-20) stays above this group (z-10) regardless of overlap. */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div style={{ scale: phoneScale }}>
            <PhoneMockup
              active={chatActive}
              contentOpacity={chatContentOpacity}
              skyOpacity={skyOpacity}
              statusBarColor={statusBarColor}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
