import { useId, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import arrowUpRightIcon from '../assets/icons/arrow-up-right.svg'
import arrowDownRightIcon from '../assets/icons/arrow-down-right.svg'
import trendingUpIcon from '../assets/icons/trending-up.svg'
import bankIcon from '../assets/icons/bank.svg'
import briefcaseIcon from '../assets/icons/briefcase.svg'
import laptopIcon from '../assets/icons/laptop.svg'
import percentIcon from '../assets/icons/percent.svg'
import moreHorizontalIcon from '../assets/icons/more-horizontal.svg'
import safeBoxIcon from '../assets/icons/safe-box.svg'
import shieldCheckIcon from '../assets/icons/shield-check.svg'
import calendarIcon from '../assets/icons/calendar.svg'

// Dark theme: a light-to-dark tonal ramp (inverse of the light-mode version) —
// still monochrome, no categorical hues, just flipped so it reads against a
// black background instead of white.
const SHADE_1 = '#ffffff'
const SHADE_2 = '#c9cac2'
const SHADE_3 = '#8f9086'
const SHADE_4 = '#55564f'

function AnimatedAmount({ progress, target, format }) {
  const [value, setValue] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => setValue(p * target))
  return <>{format(value)}</>
}

const formatRupees = (v) => `₹${Math.round(v).toLocaleString('en-IN')}`
const formatLakhs = (v) => `₹${(v / 100000).toFixed(1)}L`

// Small area+line sparkline, same mark spec as LongTermWealth's growth chart
// (2px rounded line, light wash fill) — a wobbly-but-rising polyline sampled
// from a fixed seed so it's identical on every render, not random per mount.
// Drawn in white here instead of ink, to read against the dark glass.
const SPARK_SHAPE = [0.42, 0.38, 0.5, 0.46, 0.58, 0.52, 0.64, 0.6, 0.72, 0.68, 0.8, 0.86, 1]
// Draws in sync with the same scroll-driven `progress` that counts the
// headline number up — the line grows left to right, the area fill reveals
// with it, and the end dot rides the tip, rather than appearing finished.
function Sparkline({ progress }) {
  const clipId = useId()
  const w = 240
  const h = 64
  const points = SPARK_SHAPE.map((v, i) => {
    const x = (i / (SPARK_SHAPE.length - 1)) * w
    const y = h - v * (h - 6) - 3
    return [x, y]
  })
  const linePoints = points.map(([x, y]) => `${x},${y}`).join(' ')
  const areaPoints = `0,${h} ${linePoints} ${w},${h}`

  // Same plain-state pattern as AnimatedAmount above — reading progress via
  // useMotionValueEvent rather than deriving another MotionValue keeps this
  // in sync with the count-up without a second layer of motion plumbing.
  const [reveal, setReveal] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => setReveal(p))

  const idxFloat = reveal * (points.length - 1)
  const i0 = Math.floor(idxFloat)
  const i1 = Math.min(i0 + 1, points.length - 1)
  const t = idxFloat - i0
  const [x0, y0] = points[i0]
  const [x1, y1] = points[i1]
  const dotX = x0 + (x1 - x0) * t
  const dotY = y0 + (y1 - y0) * t

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <clipPath id={clipId}>
        <rect x={0} y={0} width={reveal * w} height={h} />
      </clipPath>
      <polygon points={areaPoints} fill="#ffffff" opacity="0.12" clipPath={`url(#${clipId})`} />
      <polyline
        points={linePoints}
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - reveal}
      />
      <circle cx={dotX} cy={dotY} r="4" fill="#ffffff" stroke="#000" strokeWidth="2" />
    </svg>
  )
}

function ScreenHeader({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
        <img src={icon} alt="" className="h-5 w-5 invert" />
      </div>
      <div>
        <p className="font-gsans text-base font-semibold text-white">{title}</p>
        <p className="font-gsans text-xs text-white/50">{subtitle}</p>
      </div>
    </div>
  )
}

function BreakdownRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2.5">
        <img src={icon} alt="" className="h-4 w-4 opacity-70 invert" />
        <span className="font-gsans text-sm text-white">{label}</span>
      </div>
      <span className="font-gsans text-sm text-white/50">{value}</span>
    </div>
  )
}

function ScreenFooter({ text }) {
  return (
    <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
      <img src={shieldCheckIcon} alt="" className="h-4 w-4 opacity-50 invert" />
      <span className="font-gsans text-xs text-white/50">{text}</span>
    </div>
  )
}

// Dark frosted glass — a subtle white tint over black rather than the light-mode
// glass's white tint over the pastel gradient, matching the Revolut-style look.
const SCREEN_CARD_CLASS =
  'flex h-full w-full flex-col rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl'

function IncomeScreen({ progress }) {
  return (
    <div className={SCREEN_CARD_CLASS}>
      <ScreenHeader icon={arrowUpRightIcon} title="Income" subtitle="Money coming in" />
      <p className="mt-5 font-gsans text-3xl font-semibold text-white">
        <AnimatedAmount progress={progress} target={184200} format={formatRupees} />
      </p>
      <p className="mt-1 font-gsans text-sm text-white">+12.4% vs last month</p>
      <div className="mt-4">
        <Sparkline progress={progress} />
      </div>
      <div className="mt-2 divide-y divide-white/10">
        <BreakdownRow icon={briefcaseIcon} label="Salary" value="₹1,20,000" />
        <BreakdownRow icon={laptopIcon} label="Freelance" value="₹42,000" />
        <BreakdownRow icon={percentIcon} label="Interest" value="₹15,200" />
        <BreakdownRow icon={moreHorizontalIcon} label="Others" value="₹6,000" />
      </div>
      <ScreenFooter text="Updated from your bank accounts" />
    </div>
  )
}

const EXPENSE_SEGMENTS = [
  { key: 'needs', label: 'Needs', pct: 48, shade: SHADE_1 },
  { key: 'lifestyle', label: 'Lifestyle', pct: 32, shade: SHADE_2 },
  { key: 'bills', label: 'Bills', pct: 14, shade: SHADE_3 },
  { key: 'subscriptions', label: 'Subscriptions', pct: 6, shade: SHADE_4 },
]

function ExpenseDonut({ progress }) {
  const size = 152
  const stroke = 20
  const r = (size - stroke) / 2
  const c = size / 2
  const circumference = 2 * Math.PI * r
  const gapDeg = 4

  // Same reveal-by-progress pattern as AnimatedAmount/Sparkline — segments
  // sweep in one after another (Needs, then Lifestyle, ...) as the ring
  // fills, instead of appearing already complete.
  const [reveal, setReveal] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => setReveal(p))

  let cumPct = 0
  let angle = -90
  const arcs = EXPENSE_SEGMENTS.map(({ key, pct, shade }) => {
    const segStart = cumPct
    cumPct += pct
    const finalSweep = (pct / 100) * 360 - gapDeg
    const segFraction = Math.min(Math.max((reveal * 100 - segStart) / pct, 0), 1)
    const sweep = finalSweep * segFraction
    const dash = (sweep / 360) * circumference
    const arc = { key, shade, dasharray: `${dash} ${circumference - dash}`, rotate: angle }
    angle += (pct / 100) * 360
    return arc
  })

  return (
    <div className="relative h-[152px] w-[152px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
        {arcs.map(({ key, shade, dasharray, rotate }) => (
          <circle
            key={key}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={shade}
            strokeWidth={stroke}
            strokeDasharray={dasharray}
            strokeLinecap="butt"
            transform={`rotate(${rotate} ${c} ${c})`}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-gsans text-sm text-white/50">This</span>
        <span className="font-gsans text-sm text-white/50">month</span>
      </div>
    </div>
  )
}

function ExpensesScreen({ progress }) {
  return (
    <div className={SCREEN_CARD_CLASS}>
      <ScreenHeader icon={arrowDownRightIcon} title="Expenses" subtitle="Where your money goes" />
      <p className="mt-5 font-gsans text-3xl font-semibold text-white">
        <AnimatedAmount progress={progress} target={92400} format={formatRupees} />
      </p>
      <p className="mt-1 font-gsans text-sm text-white/50">-8% vs last month</p>
      <div className="mt-4 flex items-center gap-6">
        <ExpenseDonut progress={progress} />
        <div className="flex flex-col gap-2.5">
          {EXPENSE_SEGMENTS.map(({ key, label, pct, shade }) => (
            <div key={key} className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: shade }} />
              <span className="font-gsans text-sm text-white">{label}</span>
              <span className="font-gsans text-sm text-white/50">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <ScreenFooter text="Categorised automatically" />
    </div>
  )
}

function InvestmentsScreen({ progress }) {
  return (
    <div className={SCREEN_CARD_CLASS}>
      <ScreenHeader icon={trendingUpIcon} title="Investments" subtitle="Your wealth at work" />
      <p className="mt-5 font-gsans text-3xl font-semibold text-white">
        <AnimatedAmount progress={progress} target={1240000} format={formatLakhs} />
      </p>
      <p className="mt-1 font-gsans text-sm text-white">
        +₹1.8L (14.6%) <span className="text-white/50">Total returns</span>
      </p>
      <div className="mt-4">
        <Sparkline progress={progress} />
      </div>
      <div className="mt-2 divide-y divide-white/10">
        <BreakdownRow icon={trendingUpIcon} label="Mutual Funds" value="₹6.2L" />
        <BreakdownRow icon={trendingUpIcon} label="Stocks" value="₹4.1L" />
        <BreakdownRow icon={safeBoxIcon} label="Fixed Deposits" value="₹1.2L" />
        <BreakdownRow icon={moreHorizontalIcon} label="Others" value="₹90K" />
      </div>
      <ScreenFooter text="Tracked across all your investment accounts" />
    </div>
  )
}

function RepaidGauge({ pct, progress }) {
  const size = 152
  const stroke = 20
  const r = (size - stroke) / 2
  const c = size / 2
  const circumference = 2 * Math.PI * r
  const gapDeg = 4

  // Ring sweeps up to pct in step with the same progress driving the
  // outstanding-balance count-up, rather than appearing already filled —
  // the displayed number counts up alongside it instead of sitting fixed.
  const [reveal, setReveal] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => setReveal(p))

  const revealFraction = Math.min(Math.max(reveal, 0), 1)
  const currentPct = pct * revealFraction

  // Treated as a 2-segment ring (active + remaining) with the same gapped
  // arcs as ExpenseDonut, instead of one arc drawn flush over a full circle
  // — keeps the two donuts visually consistent.
  const activeSweep = ((pct / 100) * 360 - gapDeg) * revealFraction
  const activeDash = (activeSweep / 360) * circumference
  const remainingSweep = ((100 - pct) / 100) * 360 - gapDeg
  const remainingDash = (remainingSweep / 360) * circumference
  const remainingRotate = -90 + (pct / 100) * 360

  return (
    <div className="relative h-[152px] w-[152px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={stroke}
          strokeDasharray={`${remainingDash} ${circumference - remainingDash}`}
          strokeLinecap="butt"
          transform={`rotate(${remainingRotate} ${c} ${c})`}
        />
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="#ffffff"
          strokeWidth={stroke}
          strokeDasharray={`${activeDash} ${circumference - activeDash}`}
          strokeLinecap="butt"
          transform={`rotate(-90 ${c} ${c})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-gsans text-2xl font-semibold text-white">{Math.round(currentPct)}%</span>
        <span className="font-gsans text-sm text-white/50">Repaid</span>
      </div>
    </div>
  )
}

function LoansScreen({ progress }) {
  return (
    <div className={SCREEN_CARD_CLASS}>
      <ScreenHeader icon={bankIcon} title="Loans" subtitle="What you owe" />
      <p className="mt-5 font-gsans text-3xl font-semibold text-white">
        <AnimatedAmount progress={progress} target={320000} format={formatLakhs} />
      </p>
      <p className="mt-1 font-gsans text-sm text-white/50">Outstanding balance</p>
      <div className="mt-4 flex justify-center">
        <RepaidGauge pct={32} progress={progress} />
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 px-4 py-3">
        <div>
          <p className="font-gsans text-xs text-white/50">Total EMI</p>
          <p className="font-gsans text-base font-semibold text-white">
            ₹8,400 <span className="text-xs font-normal text-white/50">/ month</span>
          </p>
        </div>
        <img src={calendarIcon} alt="" className="h-5 w-5 opacity-60 invert" />
      </div>
      <ScreenFooter text="EMIs and balances updated automatically" />
    </div>
  )
}

// The 4 screens' hold/transition windows, as fractions of this section's own
// scroll journey. Each screen gets a "hold" span (fully in view, own count-up
// plays) and a "transition" span (sliding into the next) — not a continuous
// linear slide, the same "settle then move" pacing Hero uses for its phone.
const SCREENS = [
  { Component: IncomeScreen, holdStart: 0, holdEnd: 0.12 },
  { Component: ExpensesScreen, holdStart: 0.2, holdEnd: 0.32 },
  { Component: InvestmentsScreen, holdStart: 0.4, holdEnd: 0.52 },
  { Component: LoansScreen, holdStart: 0.6, holdEnd: 1 },
]

// Sits right after Hero's hand-off, so — same lesson as FindMoney — every
// scroll-driven value here has to start at 'start start' (this section's own
// top reaching the viewport top), not any earlier: Hero's sticky overlay still
// covers the screen before that point, so an earlier trigger would finish
// invisibly, hidden underneath it.
export default function MoneyOverview() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const trackX = useTransform(
    scrollYProgress,
    [0, 0.12, 0.2, 0.32, 0.4, 0.52, 0.6, 1],
    ['0%', '0%', '-100%', '-100%', '-200%', '-200%', '-300%', '-300%']
  )

  return (
    <section ref={sectionRef} className="relative h-[360vh] bg-[#0D0D0D]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        {/* A single soft white glow behind the content — Revolut-style: plain
            black, not colorful blobs, just a little depth near the center. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)' }}
        />

        <h2 className="relative max-w-3xl text-center text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-white">
          Complete view of your money, real time
        </h2>

        <div className="relative mt-12 h-[520px] w-full max-w-sm overflow-hidden">
          <motion.div className="flex h-full" style={{ x: trackX }}>
            {SCREENS.map(({ Component, holdStart, holdEnd }, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const screenProgress = useTransform(scrollYProgress, [holdStart, Math.min(holdStart + 0.08, holdEnd)], [0, 1])
              return (
                <div key={i} className="h-full w-full shrink-0 px-1">
                  <Component progress={screenProgress} />
                </div>
              )
            })}
          </motion.div>
        </div>

        <div className="relative mt-8 flex items-center gap-2">
          {SCREENS.map(({ holdStart, holdEnd }, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dotOpacity = useTransform(
              scrollYProgress,
              [Math.max(holdStart - 0.08, 0), holdStart, holdEnd, Math.min(holdEnd + 0.08, 1)],
              [0.3, 1, 1, 0.3]
            )
            return <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-white" style={{ opacity: dotOpacity }} />
          })}
        </div>
      </div>
    </section>
  )
}
