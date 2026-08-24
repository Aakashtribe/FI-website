import ScrollRevealSection from './ScrollRevealSection.jsx'
import { AllocationBar, Callout, WidgetShell } from './OpportunityWidget.jsx'

const SHADE_1 = '#1e1e1a'
const SHADE_2 = '#5c5d55'
const SHADE_3 = '#9a9b90'
const SHADE_4 = '#c7c8bd'

const YOU_HOLD = [
  { key: 'large-cap', label: 'Large Cap', pct: 46, shade: SHADE_1 },
  { key: 'mid-small', label: 'Mid & small', pct: 35, shade: SHADE_2 },
  { key: 'index', label: 'Index', pct: 19, shade: SHADE_3 },
]
const BALANCED = [
  { key: 'large-cap', label: 'Large Cap', pct: 30, shade: SHADE_1 },
  { key: 'mid-small', label: 'Mid & small', pct: 25, shade: SHADE_2 },
  { key: 'index', label: 'Index', pct: 30, shade: SHADE_3 },
  { key: 'debt', label: 'Debt', pct: 15, shade: SHADE_4 },
]

function PortfolioRebalanceCard() {
  return (
    <WidgetShell breadcrumb="Long term · Funds · Portfolio" title="Too much in large-cap funds" subtitle="46% large cap, no debt">
      <div className="mt-4 flex flex-col gap-3">
        <div>
          <p className="mb-1.5 font-gsans text-xs text-[#858679]">You hold</p>
          <AllocationBar segments={YOU_HOLD} />
        </div>
        <div>
          <p className="mb-1.5 font-gsans text-xs text-[#858679]">Balanced</p>
          <AllocationBar segments={BALANCED} />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {BALANCED.map(({ key, label, shade }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: shade }} />
            <span className="font-gsans text-xs text-[#858679]">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <Callout label="Earn risk adjusted return up to" amount="₹41,000" />
    </WidgetShell>
  )
}

function RegularToDirectCard() {
  return (
    <WidgetShell breadcrumb="Long term · Funds" title="Regular to Direct funds" subtitle="₹1.12Cr in regular plans">
      <p className="mt-4 font-gsans text-sm text-[#1e1e1a]">
        Regular funds charge high fees. Move to Direct funds with much lower fees.
      </p>
      <div className="mt-6 flex items-center justify-around">
        <div className="text-center">
          <p className="font-gsans text-xs text-[#858679]">Current fee</p>
          <p className="mt-1 font-gsans text-2xl font-semibold text-[#858679]">₹2.12L</p>
        </div>
        <div className="text-center">
          <p className="font-gsans text-xs text-[#858679]">Low-cost alternative</p>
          <p className="mt-1 font-gsans text-2xl font-semibold text-[#1e1e1a]">₹95,300</p>
        </div>
      </div>
      <div className="flex-1" />
      <Callout label="Save on fees up to" amount="₹1,16,700/yr" />
    </WidgetShell>
  )
}

// Compound growth from today's value to the 2035 target, sampled densely enough
// (40 points) that a plain polyline reads as a smooth curve without needing a
// bezier-fit — the underlying shape has no sharp features to smooth over.
const START_VALUE = 2.5
const END_VALUE = 20
const PLOT = { left: 8, right: 292, top: 14, bottom: 96 }

function buildGrowthPoints() {
  const steps = 40
  const points = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const value = START_VALUE * Math.pow(END_VALUE / START_VALUE, t)
    const x = PLOT.left + t * (PLOT.right - PLOT.left)
    const yFrac = (value - 0) / (END_VALUE * 1.08)
    const y = PLOT.bottom - yFrac * (PLOT.bottom - PLOT.top)
    points.push([x, y])
  }
  return points
}

function GrowthChart() {
  const points = buildGrowthPoints()
  const linePoints = points.map(([x, y]) => `${x},${y}`).join(' ')
  const areaPoints = `${PLOT.left},${PLOT.bottom} ${linePoints} ${PLOT.right},${PLOT.bottom}`
  const [endX, endY] = points[points.length - 1]

  return (
    <svg viewBox="0 0 300 110" className="w-full" role="img" aria-label="Projected portfolio growth reaching ₹20 Cr by 2035">
      <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom} stroke="#eaeae6" strokeWidth="1" />
      <polygon points={areaPoints} fill="#1e1e1a" opacity="0.08" />
      <polyline
        points={linePoints}
        fill="none"
        stroke="#1e1e1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={endX} cy={endY} r="4" fill="#1e1e1a" stroke="#fff" strokeWidth="2" />
      <text x={PLOT.left} y={PLOT.bottom + 16} className="font-gsans" fontSize="10" fill="#858679">
        2025
      </text>
      <text x={PLOT.right} y={PLOT.bottom + 16} textAnchor="end" className="font-gsans" fontSize="10" fill="#858679">
        2035
      </text>
    </svg>
  )
}

function GrowthCard() {
  return (
    <WidgetShell breadcrumb="Long term · Growth" title="Projected portfolio growth" subtitle="At your current investment rate">
      <div className="mt-4">
        <GrowthChart />
      </div>
      <div className="flex-1" />
      <Callout label="On track to grow to" amount="₹20 Cr by 2035" />
    </WidgetShell>
  )
}

const CARDS = [
  { Component: RegularToDirectCard, revealStart: 0.06, revealEnd: 0.16 },
  { Component: PortfolioRebalanceCard, revealStart: 0.32, revealEnd: 0.42 },
  { Component: GrowthCard, revealStart: 0.58, revealEnd: 0.68 },
]

export default function LongTermWealth() {
  return (
    <ScrollRevealSection
      heading="Simple actions to build long term wealth"
      cards={CARDS}
      sectionClassName="bg-[#f7f7f6]"
    />
  )
}
