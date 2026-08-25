import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const MAX_CARD_WIDTH = 460

// Same hold-then-transition breakpoint shape as the other carousels on this
// page: each card holds centered for a stretch of scroll, then hands off to
// the next — a coverflow instead of a straight slide, so the outgoing card
// shrinks and drifts to the side (half-visible) while the incoming one
// grows in from the opposite edge.
const PROGRESS_POINTS = [0.14, 0.29, 0.43, 0.57, 0.71, 1]
const CURSOR_VALUES = [0, 0, 1, 1, 2, 2]

function CarouselCard({ Component, cursor, index, revealOpacity, cardWidth, peekOffset }) {
  // Positive = not-yet-active (peeks in from the right); negative = already
  // passed (exits to the left) — index minus cursor, not the other way, so
  // the motion reads left-to-right as scroll advances.
  const relativePos = useTransform(cursor, (v) => index - v)
  const x = useTransform(relativePos, [-2, -1, 0, 1, 2], [-peekOffset * 2, -peekOffset, 0, peekOffset, peekOffset * 2])
  const scale = useTransform(relativePos, [-2, -1, 0, 1, 2], [0.6, 0.72, 1, 0.72, 0.6])
  const coverflowOpacity = useTransform(relativePos, [-2, -1, 0, 1, 2], [0, 0.45, 1, 0.45, 0])
  const opacity = useTransform([revealOpacity, coverflowOpacity], ([a, b]) => a * b)
  const zIndex = useTransform(relativePos, [-2, -1, 0, 1, 2], [1, 3, 10, 3, 1])

  return (
    <motion.div
      style={{ x, scale, opacity, zIndex, width: cardWidth, marginLeft: -cardWidth / 2 }}
      className="absolute inset-y-0 left-1/2"
    >
      <Component />
    </motion.div>
  )
}

// Coverflow carousel: one card centered and full size, its neighbors peeking
// in half-scale on either side, scroll advancing which one is focused.
export default function CardCarousel({ heading, cards, sectionClassName = '', headingColor = '#1e1e1a' }) {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  // Cards were a fixed 460px regardless of viewport, overflowing narrow
  // phone screens entirely — measured live off the container instead, the
  // same pattern PhoneMockup uses, so it shrinks to fit on mobile.
  const [cardWidth, setCardWidth] = useState(MAX_CARD_WIDTH)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => {
      const { width } = el.getBoundingClientRect()
      if (width > 0) setCardWidth(Math.min(MAX_CARD_WIDTH, width))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const peekOffset = cardWidth * 0.68

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const headingOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1])
  const headingY = useTransform(scrollYProgress, [0, 0.06], [20, 0])
  // Cards wait for the heading to settle before fading in themselves.
  const cardsRevealOpacity = useTransform(scrollYProgress, [0.06, 0.14], [0, 1])
  const cursor = useTransform(scrollYProgress, PROGRESS_POINTS, CURSOR_VALUES)

  return (
    <section ref={sectionRef} className={`relative h-[320vh] ${sectionClassName}`}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.h2
          style={{ opacity: headingOpacity, y: headingY, color: headingColor }}
          className="max-w-3xl text-center text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight"
        >
          {heading}
        </motion.h2>
        <div ref={containerRef} className="relative mt-16 h-[460px] w-full max-w-5xl">
          {cards.map(({ Component }, i) => (
            <CarouselCard
              key={i}
              Component={Component}
              cursor={cursor}
              index={i}
              revealOpacity={cardsRevealOpacity}
              cardWidth={cardWidth}
              peekOffset={peekOffset}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
