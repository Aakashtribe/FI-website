import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import safeBoxIcon from '../assets/icons/safe-box.svg'
import receiptPercentIcon from '../assets/icons/receipt-percent.svg'
import creditCardIcon from '../assets/icons/credit-card.svg'
import refreshIcon from '../assets/icons/refresh.svg'
import giftIcon from '../assets/icons/gift.svg'
import eyeOffIcon from '../assets/icons/eye-off.svg'
import undoIcon from '../assets/icons/undo.svg'

const WIDGETS = [
  { key: 'idle-cash', icon: safeBoxIcon, label: 'Idle cash', amount: '₹42,300', detail: 'sitting idle' },
  { key: 'tax-saving', icon: receiptPercentIcon, label: 'Tax saving', amount: '₹18,500', detail: 'unclaimed' },
  { key: 'new-card', icon: creditCardIcon, label: 'New card', amount: '₹6,200', detail: 'in missed rewards/yr' },
  { key: 'subscriptions', icon: refreshIcon, label: 'Forgotten subscriptions', amount: '₹2,150', detail: 'wasted/mo' },
  { key: 'reward-points', icon: giftIcon, label: 'Unused reward points', amount: '₹3,800', detail: 'in points' },
  { key: 'hidden-fees', icon: eyeOffIcon, label: 'Hidden bank fees', amount: '₹1,240', detail: 'in fees' },
  { key: 'deposits', icon: undoIcon, label: 'Refundable deposits', amount: '₹9,000', detail: 'owed back' },
]

// This is the hand-off after the Hero's phone zooms up huge and fades out — no
// phone here, just the heading and widgets fading in as the section scrolls into
// view, then fading back out as it scrolls past — the same appear-then-disappear
// treatment as the Hero's own headline, just driven by this section's scroll
// journey instead of Hero's pinned one.
export default function FindMoney() {
  const sectionRef = useRef(null)
  // Hero's sticky pin only fully releases once this section's top reaches the
  // viewport top ('start start') — until then, Hero's own opaque white overlay
  // (and its zoomed phone) still covers most of the screen, so any fade tied to
  // scroll positions before that point completes invisibly, hidden underneath.
  // The fade has to start only after that hand-off. The end anchor is 'end end'
  // (this section's bottom reaching the viewport's bottom), not 'end start' —
  // this is the LAST section on the page, so the page's max scroll stops there;
  // 'end start' would need scroll room past the document's actual end, which
  // doesn't exist, making that fade-out unreachable no matter how far scrolled.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="flex flex-col items-center bg-[#f7f7f6] px-6 py-24">
      <motion.h2
        style={{ opacity }}
        className="max-w-3xl text-center text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]"
      >
        Find money left on the table, under the bed or in hidden fees
      </motion.h2>
      <motion.div
        style={{ opacity }}
        className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {WIDGETS.map(({ key, icon, label, amount, detail }) => (
          <div
            key={key}
            className="flex flex-col justify-between rounded-2xl border border-[#eaeae6] bg-white p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f7f6]">
              <img src={icon} alt="" className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <p className="font-gsans text-sm text-[#858679]">{label}</p>
              <p className="mt-1 font-gsans text-2xl font-semibold text-[#1e1e1a]">
                {amount} <span className="text-sm font-normal text-[#858679]">{detail}</span>
              </p>
            </div>
            <button
              type="button"
              className="mt-6 self-start rounded-full bg-[#1e1e1a] px-5 py-2 font-gsans text-sm font-medium text-white transition-colors duration-200 hover:bg-[#33322c]"
            >
              Unlock
            </button>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
