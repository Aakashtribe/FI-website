import arrowUpIcon from '../assets/icons/arrow-up.svg'

export function AskInput({ placeholder }) {
  return (
    <div className="mt-4 flex min-h-12 items-center justify-between rounded-full border border-[#eaeae6] bg-white py-2 pl-4 pr-2">
      <p className="font-gsans text-sm text-[#858679]">
        <span className="text-[#1e1e1a]">|</span>
        {placeholder}
      </p>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#858679]">
        <img src={arrowUpIcon} alt="" className="h-4 w-4 invert" />
      </div>
    </div>
  )
}

// `glass` swaps the light opaque card for the same dark frosted-glass look
// MoneyOverview uses (bg-white/10 + a stronger backdrop-blur, border-white/10)
// — for widget cards sitting on a black section instead of a white one.
export function WidgetShell({ title, subtitle, children, glass = false }) {
  return (
    <div
      className={
        glass
          ? 'flex h-full flex-col rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl'
          : 'flex h-full flex-col rounded-2xl border border-[#eaeae6] bg-white p-6 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.12)]'
      }
    >
      <p className={`font-gsans text-lg font-semibold ${glass ? 'text-white' : 'text-[#1e1e1a]'}`}>{title}</p>
      <p className={`mt-0.5 font-gsans text-sm ${glass ? 'text-white/50' : 'text-[#858679]'}`}>{subtitle}</p>
      <div className={`mt-4 border-t border-dashed ${glass ? 'border-white/15' : 'border-[#dcdcd8]'}`} />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}

export function Callout({ label, amount, glass = false }) {
  return (
    <div
      className={`mt-4 flex items-center justify-between rounded-xl px-4 py-3 ${glass ? 'bg-white/15' : 'bg-[#f7f7f6]'}`}
    >
      <span className={`font-gsans text-sm ${glass ? 'text-white' : 'text-[#1e1e1a]'}`}>{label}</span>
      <span className={`font-gsans text-lg font-semibold ${glass ? 'text-white' : 'text-[#1e1e1a]'}`}>{amount}</span>
    </div>
  )
}

export function AllocationBar({ segments }) {
  return (
    <div className="flex h-8 w-full overflow-hidden rounded-lg" style={{ gap: 2 }}>
      {segments.map(({ key, pct, shade, textColor = '#ffffff' }) => (
        <div key={key} className="flex items-center justify-center" style={{ width: `${pct}%`, backgroundColor: shade }}>
          <span className="font-gsans text-xs font-semibold" style={{ color: textColor }}>
            {pct}%
          </span>
        </div>
      ))}
    </div>
  )
}
