import CardCarousel from './CardCarousel.jsx'
import { Callout, WidgetShell } from './OpportunityWidget.jsx'

function CashInSavingsCard() {
  return (
    <WidgetShell title="Cash lying in savings account" subtitle="₹8.4L idle for 4 months">
      <p className="mt-4 font-gsans text-xs text-[#1e1e1a] md:text-sm">
        Currently earning 3.5%. A one-year FD pays up to 7.5%.
      </p>
      <div className="mt-6 flex items-end justify-center gap-10">
        <div className="flex flex-col items-center gap-1.5 md:gap-2">
          <div className="h-10 w-16 rounded-t-md bg-[#e0e0dc]" />
          <p className="font-gsans text-xs text-[#858679] md:text-sm">Savings</p>
          <p className="font-gsans text-sm font-semibold text-[#1e1e1a] md:text-base">3.5%</p>
        </div>
        <div className="flex flex-col items-center gap-1.5 md:gap-2">
          <p className="font-gsans text-[11px] font-semibold text-[#1e1e1a] md:text-xs">+3.9%</p>
          <div className="h-24 w-16 rounded-t-md bg-[#1e1e1a]" />
          <p className="font-gsans text-xs text-[#858679] md:text-sm">Fixed deposit</p>
          <p className="font-gsans text-sm font-semibold text-[#1e1e1a] md:text-base">up to 7.5%</p>
        </div>
      </div>
      <div className="flex-1" />
      <Callout label="Earn additional interest of up to" amount="₹63,000" />
    </WidgetShell>
  )
}

function TaxHarvestingCard() {
  return (
    <WidgetShell title="Tax harvesting" subtitle="Expires 31 March">
      <p className="mt-4 font-gsans text-xs text-[#1e1e1a] md:text-sm">
        You get ₹1.25L of tax-free gains each year, and you can also book losses to minimise tax.
      </p>
      <div className="mt-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#eaeae6]">
          <div className="h-full w-[8%] rounded-full bg-[#1e1e1a]" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-gsans text-[11px] text-[#858679] md:text-xs">₹10,000 used</span>
          <span className="font-gsans text-[11px] text-[#858679] md:text-xs">₹1,15,000 available</span>
        </div>
      </div>
      <div className="flex-1" />
      <Callout label="Reduce tax burden up to" amount="₹41,900" />
    </WidgetShell>
  )
}

function NewCardCard() {
  return (
    <WidgetShell title="Get a card that fits your spending" subtitle="Matched to your balance & goals">
      <p className="mt-4 font-gsans text-xs text-[#1e1e1a] md:text-sm">
        Your card doesn't reward your top spending categories. A better-matched card unlocks more value from the same spend.
      </p>
      <div className="mt-6 flex items-end justify-center gap-10">
        <div className="flex flex-col items-center gap-1.5 md:gap-2">
          <div className="h-10 w-16 rounded-t-md bg-[#e0e0dc]" />
          <p className="font-gsans text-xs text-[#858679] md:text-sm">Current card</p>
          <p className="font-gsans text-sm font-semibold text-[#1e1e1a] md:text-base">1% back</p>
        </div>
        <div className="flex flex-col items-center gap-1.5 md:gap-2">
          <p className="font-gsans text-[11px] font-semibold text-[#1e1e1a] md:text-xs">+4%</p>
          <div className="h-24 w-16 rounded-t-md bg-[#1e1e1a]" />
          <p className="font-gsans text-xs text-[#858679] md:text-sm">Matched card</p>
          <p className="font-gsans text-sm font-semibold text-[#1e1e1a] md:text-base">up to 5% back</p>
        </div>
      </div>
      <div className="flex-1" />
      <Callout label="Unlock extra rewards worth up to" amount="₹18,400/yr" />
    </WidgetShell>
  )
}

const CARDS = [{ Component: CashInSavingsCard }, { Component: TaxHarvestingCard }, { Component: NewCardCard }]

export default function FindMoney() {
  return (
    <CardCarousel
      heading="Find money left on the table, under the bed or in hidden fees"
      cards={CARDS}
      sectionClassName="bg-white"
    />
  )
}
