import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function RevealCard({ Component, progress, revealStart, revealEnd }) {
  const opacity = useTransform(progress, [revealStart, revealEnd], [0, 1])
  const y = useTransform(progress, [revealStart, revealEnd], [40, 0])
  return (
    <motion.div style={{ opacity, y }}>
      <Component />
    </motion.div>
  )
}

// Section pins for the scroll duration; heading and cards fade/slide in one
// after another in their own dedicated scroll segment (each with a hold before
// the next starts), settling fully visible before releasing into the next section.
export default function ScrollRevealSection({ heading, cards, sectionClassName = '', heightClassName = 'h-[320vh]' }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const headingOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1])
  const headingY = useTransform(scrollYProgress, [0, 0.06], [20, 0])

  return (
    <section ref={sectionRef} className={`relative ${heightClassName} ${sectionClassName}`}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6">
        <motion.h2
          style={{ opacity: headingOpacity, y: headingY }}
          className="max-w-3xl text-center text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]"
        >
          {heading}
        </motion.h2>
        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ Component, revealStart, revealEnd }) => (
            <RevealCard key={revealStart} Component={Component} progress={scrollYProgress} revealStart={revealStart} revealEnd={revealEnd} />
          ))}
        </div>
      </div>
    </section>
  )
}
