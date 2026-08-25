import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CARD_WIDTH = 460
const PEEK_OFFSET = CARD_WIDTH * 0.68

// The carousel itself only starts moving once the heading has fully
// appeared and the cards have faded in after it — not simultaneously with
// the heading — so the breakpoints are compressed into the tail of the
// scroll range instead of starting at 0.
const PROGRESS_POINTS = [0.14, 0.29, 0.43, 0.57, 0.71, 1]
const CURSOR_VALUES = [0, 0, 1, 1, 2, 2]

function CarouselCard({ Component, cursor, index, revealOpacity }) {
  // Positive = not-yet-active (peeks in from the right); negative = already
  // passed (exits to the left) — index minus cursor, not the other way, so
  // the motion reads left-to-right as scroll advances.
  const relativePos = useTransform(cursor, (v) => index - v)
  const x = useTransform(relativePos, [-2, -1, 0, 1, 2], [-PEEK_OFFSET * 2, -PEEK_OFFSET, 0, PEEK_OFFSET, PEEK_OFFSET * 2])
  const scale = useTransform(relativePos, [-2, -1, 0, 1, 2], [0.6, 0.72, 1, 0.72, 0.6])
  const coverflowOpacity = useTransform(relativePos, [-2, -1, 0, 1, 2], [0, 0.45, 1, 0.45, 0])
  const opacity = useTransform([revealOpacity, coverflowOpacity], ([a, b]) => a * b)
  const zIndex = useTransform(relativePos, [-2, -1, 0, 1, 2], [1, 3, 10, 3, 1])

  return (
    <motion.div
      style={{ x, scale, opacity, zIndex, width: CARD_WIDTH, marginLeft: -CARD_WIDTH / 2 }}
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
        <div className="relative mt-16 h-[460px] w-full max-w-5xl">
          {cards.map(({ Component }, i) => (
            <CarouselCard key={i} Component={Component} cursor={cursor} index={i} revealOpacity={cardsRevealOpacity} />
          ))}
        </div>
      </div>
    </section>
  )
}
