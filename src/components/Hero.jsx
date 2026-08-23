import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Nav from './Nav.jsx'
import PhoneMockup from './PhoneMockup.jsx'

// Must match the mockup box in PhoneMockup.jsx (w-[290px] md:w-[340px], same aspect ratio
// as the source PNG, 2030x4123).
const BASE_WIDTH_MOBILE = 290
const BASE_WIDTH_DESKTOP = 340
const CONTAINER_ASPECT = 2030 / 4123
// Fraction of the mockup box the phone's screen (not its bezel/frame) actually
// occupies — the narrower of the screen box's width/height fill (measured in
// PhoneMockup.jsx's SCREEN constant) is the binding one for "huge intro" coverage.
const SCREEN_FILL_RATIO = 0.928
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

  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.26], [1, 0])
  const navTextColor = useTransform(scrollYProgress, [0.1, 0.26], ['#ffffff', '#1e1e1a'])

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0])
  const headlineY = useTransform(scrollYProgress, [0, 0.18], [0, -20])

  // Phone starts huge (screen fills the viewport, no bezel visible), squeezes down
  // to its normal chat-interface size, holds there, then zooms back in at the end.
  // coverScale is computed from the real viewport so this holds on any screen size.
  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.85],
    [coverScale, 1, 1, coverScale * 1.8]
  )
  const phoneGroupOpacity = useTransform(scrollYProgress, [0.9, 0.98], [1, 0])

  // The in-screen chat plays once the phone has settled to its normal size, so it
  // isn't running (illegibly) while the phone is still huge/zooming past the camera.
  // No falling edge on the far end: once triggered, it stays active for the rest of
  // the forward scroll (SlashChatScreen just keeps looping) — it only resets if the
  // user scrolls back up past the start, not by continuing to scroll down past it.
  const chatActive = useTransform(scrollYProgress, [0.32, 0.38], [0, 1])
  // The chat's own white UI needs to stay hidden while the phone is huge — otherwise
  // its white background sits directly behind the white headline with no contrast.
  const chatContentOpacity = useTransform(scrollYProgress, [0.16, 0.24, 0.85, 0.92], [0, 1, 1, 0])
  // The phone's screen shows a blue sky photo at rest (behind the headline), which
  // fades out right as the chat content fades in — a hand-off, not an overlap.
  const skyOpacity = useTransform(scrollYProgress, [0, 0.16, 0.24], [1, 1, 0])

  return (
    <section ref={sectionRef} className="relative h-[320vh]">
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

        <Nav textColor={navTextColor} />

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

        <motion.div
          style={{ opacity: phoneGroupOpacity }}
          className="absolute inset-0 z-10 flex items-center justify-center pt-20 md:pt-24"
        >
          <motion.div style={{ scale: phoneScale }}>
            <PhoneMockup active={chatActive} contentOpacity={chatContentOpacity} skyOpacity={skyOpacity} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
