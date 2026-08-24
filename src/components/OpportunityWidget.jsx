import chevronDownIcon from '../assets/icons/chevron-down.svg'
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

export function WidgetShell({ breadcrumb, title, subtitle, children }) {
  return (
    <div className="flex h-full flex-col">
      <p className="mb-3 font-gsans text-sm text-[#858679]">{breadcrumb}</p>
      <div className="flex h-full flex-col rounded-2xl border border-[#eaeae6] bg-white p-6 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.12)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-gsans text-lg font-semibold text-[#1e1e1a]">{title}</p>
            <p className="mt-0.5 font-gsans text-sm text-[#858679]">{subtitle}</p>
          </div>
          <img src={chevronDownIcon} alt="" className="mt-1 h-4 w-4 shrink-0 opacity-60" />
        </div>
        <div className="mt-4 border-t border-dashed border-[#dcdcd8]" />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

export function Callout({ label, amount }) {
  return (
    <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f7f7f6] px-4 py-3">
      <span className="font-gsans text-sm text-[#1e1e1a]">{label}</span>
      <span className="font-gsans text-lg font-semibold text-[#1e1e1a]">{amount}</span>
    </div>
  )
}

export function AllocationBar({ segments }) {
  return (
    <div className="flex h-8 w-full overflow-hidden rounded-lg" style={{ gap: 2 }}>
      {segments.map(({ key, pct, shade }) => (
        <div key={key} className="flex items-center justify-center" style={{ width: `${pct}%`, backgroundColor: shade }}>
          <span className="font-gsans text-xs font-semibold text-white">{pct}%</span>
        </div>
      ))}
    </div>
  )
}
