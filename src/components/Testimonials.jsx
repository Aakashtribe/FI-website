import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'

// "Swati Arora" -> "SA", "Aakash" -> "A" — first letter of up to the first
// two words, standing in for a real photo we don't have for each reviewer.
function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

const TESTIMONIALS = [
  {
    name: 'Aakash',
    quote: 'I understand my money so much better now. I actually started investing because of what tr/be showed me.',
  },
  {
    name: 'Arsalan',
    quote: 'tr/be moved my money into higher-return products at virtually no added risk. I now use it to track all my expenses and investments.',
  },
  {
    name: 'Nishant Sinha',
    quote: 'My spends, loans and SIPs in one view, each with a next step. It replaced three apps and a very messy sheet.',
  },
  {
    name: 'Swati Arora',
    quote: 'I used to struggle to track expenses. tr/be has made it super convenient for me.',
  },
  {
    name: 'Nikhil G',
    quote: 'I never realised the amount of money I was leaving on the table in unnecessary fees, and low interest rates. tr/be unlocked over ₹1L in money for me.',
  },
  {
    name: 'Priyanka',
    quote: 'I love tr/be, I get to see all my finances at one place. And it prompts me when it finds opportunities to unlock money.',
  },
]

function wrap(min, max, value) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

function TestimonialCard({ name, quote }) {
  return (
    <div className="flex h-full w-80 shrink-0 flex-col rounded-2xl border border-white/70 bg-white/60 p-6 shadow-xl shadow-black/5 backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaeae6]">
          <span className="font-gsans text-xs font-semibold text-[#1e1e1a]">{getInitials(name)}</span>
        </div>
        <p className="font-gsans text-sm font-medium text-[#1e1e1a]">{name}</p>
      </div>
      <p className="mt-4 font-gsans text-sm leading-relaxed text-[#1e1e1a]">“{quote}”</p>
    </div>
  )
}

const BASE_SPEED = 34 // px/sec, default autoplay pace
const DEFAULT_VELOCITY = -BASE_SPEED // right to left at rest
const MAX_FLING_SPEED = 1400 // px/sec cap on a dragged/flung velocity
const RETURN_RATE = 1.3 // how fast velocity eases back to DEFAULT_VELOCITY after release

function TestimonialMarquee() {
  const listRef = useRef(null)
  const [listWidth, setListWidth] = useState(0)
  const x = useMotionValue(0)
  // Signed px/sec — while idle this eases back toward DEFAULT_VELOCITY; a drag
  // sets it directly (direction + speed), so dragging left<->right actually
  // reverses the flow instead of just changing speed on a fixed direction.
  const velocity = useRef(DEFAULT_VELOCITY)
  const dragging = useRef(false)
  const lastPointerX = useRef(null)
  const lastPointerTime = useRef(null)

  useLayoutEffect(() => {
    const el = listRef.current
    if (!el) return
    const measure = () => setListWidth(el.getBoundingClientRect().width)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (!listWidth || dragging.current) return
    const dt = Math.min(delta / 1000, 0.05)
    velocity.current += (DEFAULT_VELOCITY - velocity.current) * Math.min(1, dt * RETURN_RATE)
    x.set(x.get() + velocity.current * dt)
  })

  const displayX = useTransform(x, (v) => (listWidth ? `${wrap(-listWidth, 0, v)}px` : '0px'))

  const handlePointerDown = (e) => {
    dragging.current = true
    lastPointerX.current = e.clientX
    lastPointerTime.current = e.timeStamp
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const handlePointerMove = (e) => {
    if (!dragging.current || lastPointerX.current === null) return
    const dx = e.clientX - lastPointerX.current
    const dtMs = Math.max(e.timeStamp - lastPointerTime.current, 1)
    x.set(x.get() + dx)
    velocity.current = Math.max(-MAX_FLING_SPEED, Math.min(MAX_FLING_SPEED, (dx / dtMs) * 1000))
    lastPointerX.current = e.clientX
    lastPointerTime.current = e.timeStamp
  }
  const handlePointerUp = () => {
    dragging.current = false
    lastPointerX.current = null
    lastPointerTime.current = null
  }

  return (
    <div
      className="relative z-10 mt-16 w-full max-w-6xl cursor-grab touch-pan-x select-none overflow-hidden py-8 active:cursor-grabbing"
      style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <motion.div style={{ x: displayX }} className="flex">
        <div ref={listRef} className="flex">
          {TESTIMONIALS.map((t) => (
            <div key={`a-${t.name}`} className="pr-6">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {TESTIMONIALS.map((t) => (
            <div key={`b-${t.name}`} className="pr-6">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#f7f7f6] px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-10 h-80 w-80 rounded-full bg-[#1e1e1a]/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-[#1e1e1a]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />
      </div>
      <h2 className="relative z-10 max-w-3xl text-center text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]">
        The people have spoken (and they like tr/be)
      </h2>
      <TestimonialMarquee />
    </section>
  )
}
