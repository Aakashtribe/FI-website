import CardCarousel from './CardCarousel.jsx'
import { AllocationBar, Callout, WidgetShell } from './OpportunityWidget.jsx'

// Muted light-to-dark ramp for the dark-glass cards — toned down from a
// pure-white top stop (read as too bright/harsh against the near-black bg)
// to a soft off-white instead. Lighter stops pair with dark text, darker
// stops with light text, so the percentage labels stay legible throughout.
const SHADE_1 = '#d8d8d2'
const SHADE_2 = '#a8a89e'
const SHADE_3 = '#75756b'
const SHADE_4 = '#45453f'
const TEXT_1 = '#1e1e1a'
const TEXT_2 = '#1e1e1a'
const TEXT_3 = '#ffffff'
const TEXT_4 = '#ffffff'

const YOU_HOLD = [
  { key: 'large-cap', label: 'Large Cap', pct: 46, shade: SHADE_1, textColor: TEXT_1 },
  { key: 'mid-small', label: 'Mid & small', pct: 35, shade: SHADE_2, textColor: TEXT_2 },
  { key: 'index', label: 'Index', pct: 19, shade: SHADE_3, textColor: TEXT_3 },
]
const BALANCED = [
  { key: 'large-cap', label: 'Large Cap', pct: 30, shade: SHADE_1, textColor: TEXT_1 },
  { key: 'mid-small', label: 'Mid & small', pct: 25, shade: SHADE_2, textColor: TEXT_2 },
  { key: 'index', label: 'Index', pct: 30, shade: SHADE_3, textColor: TEXT_3 },
  { key: 'debt', label: 'Debt', pct: 15, shade: SHADE_4, textColor: TEXT_4 },
]

function PortfolioRebalanceCard() {
  return (
    <WidgetShell glass title="Too much in large-cap funds" subtitle="46% large cap, no debt">
      <div className="mt-4 flex flex-col gap-3">
        <div>
          <p className="mb-1.5 font-gsans text-xs text-white/50">You hold</p>
          <AllocationBar segments={YOU_HOLD} />
        </div>
        <div>
          <p className="mb-1.5 font-gsans text-xs text-white/50">Balanced</p>
          <AllocationBar segments={BALANCED} />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {BALANCED.map(({ key, label, shade }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: shade }} />
            <span className="font-gsans text-xs text-white/50">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <Callout glass label="Earn risk adjusted return up to" amount="₹41,000" />
    </WidgetShell>
  )
}

function RegularToDirectCard() {
  return (
    <WidgetShell glass title="Regular to Direct funds" subtitle="₹1.12Cr in regular plans">
      <p className="mt-4 font-gsans text-sm text-white">
        Regular funds charge high fees. Move to Direct funds with much lower fees.
      </p>
      <div className="mt-6 flex items-center justify-around">
        <div className="text-center">
          <p className="font-gsans text-xs text-white/50">Current fee</p>
          <p className="mt-1 font-gsans text-2xl font-semibold text-white/50">₹2.12L</p>
        </div>
        <div className="text-center">
          <p className="font-gsans text-xs text-white/50">Low-cost alternative</p>
          <p className="mt-1 font-gsans text-2xl font-semibold text-white">₹95,300</p>
        </div>
      </div>
      <div className="flex-1" />
      <Callout glass label="Save on fees up to" amount="₹1,16,700/yr" />
    </WidgetShell>
  )
}

// Compound growth from today's value to the 2035 target, sampled densely enough
// (40 points) that a plain polyline reads as a smooth curve without needing a
// bezier-fit — the underlying shape has no sharp features to smooth over.
const START_VALUE = 2.5
const END_VALUE = 20
const START_YEAR = 2025
const END_YEAR = 2035
const PLOT = { left: 8, right: 292, top: 14, bottom: 96 }
const CHART_TOP_VALUE = END_VALUE * 1.08

const valueToY = (value) => PLOT.bottom - (value / CHART_TOP_VALUE) * (PLOT.bottom - PLOT.top)
const yearToX = (year) => PLOT.left + ((year - START_YEAR) / (END_YEAR - START_YEAR)) * (PLOT.right - PLOT.left)
const valueAtYear = (year) => START_VALUE * Math.pow(END_VALUE / START_VALUE, (year - START_YEAR) / (END_YEAR - START_YEAR))

// Horizontal gridlines with their own value labels, and a couple of
// intermediate year ticks — fills what was otherwise a mostly empty plot
// area with actual scale reference, not just the bare curve.
const GRID_VALUES = [5, 10, 15, 20]
const YEAR_TICKS = [2025, 2028, 2031, 2035]
const MID_YEAR = 2031

function buildGrowthPoints() {
  const steps = 40
  const points = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const year = START_YEAR + t * (END_YEAR - START_YEAR)
    points.push([yearToX(year), valueToY(valueAtYear(year))])
  }
  return points
}

function GrowthChart() {
  const points = buildGrowthPoints()
  const linePoints = points.map(([x, y]) => `${x},${y}`).join(' ')
  const areaPoints = `${PLOT.left},${PLOT.bottom} ${linePoints} ${PLOT.right},${PLOT.bottom}`
  const [endX, endY] = points[points.length - 1]
  const midX = yearToX(MID_YEAR)
  const midY = valueToY(valueAtYear(MID_YEAR))

  return (
    <svg viewBox="0 0 300 118" className="w-full" role="img" aria-label="Projected portfolio growth reaching ₹20 Cr by 2035">
      {GRID_VALUES.map((v) => (
        <g key={v}>
          <line x1={PLOT.left} y1={valueToY(v)} x2={PLOT.right} y2={valueToY(v)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x={PLOT.left} y={valueToY(v) - 4} className="font-gsans" fontSize="8" fill="rgba(255,255,255,0.4)">
            ₹{v}Cr
          </text>
        </g>
      ))}
      <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <polygon points={areaPoints} fill="#ffffff" opacity="0.1" />
      <polyline
        points={linePoints}
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={midX} cy={midY} r="3" fill="#1e1e1a" stroke="#ffffff" strokeWidth="1.5" />
      <text x={midX} y={midY - 10} textAnchor="middle" className="font-gsans" fontSize="9" fill="#ffffff">
        ₹{valueAtYear(MID_YEAR).toFixed(1)}Cr
      </text>
      <circle cx={endX} cy={endY} r="4" fill="#ffffff" stroke="#000" strokeWidth="2" />
      {YEAR_TICKS.map((year) => (
        <text
          key={year}
          x={yearToX(year)}
          y={PLOT.bottom + 16}
          textAnchor={year === START_YEAR ? 'start' : year === END_YEAR ? 'end' : 'middle'}
          className="font-gsans"
          fontSize="10"
          fill="rgba(255,255,255,0.5)"
        >
          {year}
        </text>
      ))}
    </svg>
  )
}

function GrowthCard() {
  return (
    <WidgetShell glass title="Projected portfolio growth" subtitle="At your current investment rate">
      <div className="mt-4">
        <GrowthChart />
      </div>
      <div className="flex-1" />
      <Callout glass label="On track to grow to" amount="₹20 Cr by 2035" />
    </WidgetShell>
  )
}

const CARDS = [{ Component: RegularToDirectCard }, { Component: PortfolioRebalanceCard }, { Component: GrowthCard }]

export default function LongTermWealth() {
  return (
    <CardCarousel
      heading="Simple actions to build long term wealth"
      cards={CARDS}
      sectionClassName="bg-[#0D0D0D]"
      headingColor="#ffffff"
    />
  )
}
