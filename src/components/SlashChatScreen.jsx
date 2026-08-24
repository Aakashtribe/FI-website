import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'framer-motion'
import micIcon from '../assets/icons/mic.svg'
import arrowUpIcon from '../assets/icons/arrow-up.svg'
import stopIcon from '../assets/icons/stop.svg'
import slashAiIcon from '../assets/icons/slash-ai.svg'
import creditCardIcon from '../assets/icons/credit-card.svg'
import safeBoxIcon from '../assets/icons/safe-box.svg'
import bankIcon from '../assets/icons/bank.svg'
import menuIcon from '../assets/icons/menu.svg'
import rightSideIcon from '../assets/icons/right-side.svg'

// Matches the "Chat" screens from Figma (node 731-30487 / 30561 / 30623) pixel-for-pixel:
// a fixed 360x800 canvas, scaled to fit whatever container it's placed in — see
// DESIGN_W/DESIGN_H below and the `scale` wrapper each consumer (SlashChat.jsx,
// PhoneMockup.jsx) applies.
// idle -> user types a query -> sent (query moves into its own bubble) -> the AI
// reply appears immediately, selling a fast/instant response.
export const DESIGN_W = 360
export const DESIGN_H = 800

const QUERY = 'My budget is chaos. Help me fix it. 🔥'
const RESPONSE = "Don't worry, I've seen worse. 😌\nI'm about to investigate your finances like a true crime documentary."

const NAV_ITEMS = [
  { key: 'slash', label: 'Slash', icon: slashAiIcon, active: true },
  { key: 'spends', label: 'Spends', icon: creditCardIcon, active: false },
  { key: 'assets', label: 'Assets', icon: safeBoxIcon, active: false },
  { key: 'fd', label: 'FD', icon: bankIcon, active: false },
]

// Each beat gets its own slice of the 0-1 progress range: a short idle hold
// (just "Hey you,"), the query typing out, a short pause, then the reply
// typing out — scaled by relative character count so neither one is rushed.
const IDLE_END = 0.08
const QUERY_END = IDLE_END + 0.4
const PAUSE_END = QUERY_END + 0.07
const RESPONSE_END = 1

function remap(value, [inStart, inEnd]) {
  if (inEnd === inStart) return value >= inEnd ? 1 : 0
  return Math.min(1, Math.max(0, (value - inStart) / (inEnd - inStart)))
}

// The screen content only, sized to fill its parent — no phone chrome of its own.
// `active` is a Framer Motion value tracking scroll progress directly (0-1): the
// whole idle -> typing -> responding sequence is scrubbed by it rather than run
// on independent timers, so wherever you stop scrolling is exactly what's shown
// — no racing ahead while you're not looking, and scrolling back up rewinds it.
export default function SlashChatScreen({ active, notch, showStatusBar = true }) {
  const queryLength = useTransform(active, (v) => Math.round(remap(v, [IDLE_END, QUERY_END]) * QUERY.length))
  const responseLength = useTransform(active, (v) => Math.round(remap(v, [PAUSE_END, RESPONSE_END]) * RESPONSE.length))

  const [typedQuery, setTypedQuery] = useState(QUERY.slice(0, queryLength.get()))
  const [typedResponse, setTypedResponse] = useState(RESPONSE.slice(0, responseLength.get()))
  const [isTyping, setIsTyping] = useState(active.get() > IDLE_END && active.get() < PAUSE_END)
  const [isSent, setIsSent] = useState(active.get() >= PAUSE_END)

  useMotionValueEvent(queryLength, 'change', (v) => setTypedQuery(QUERY.slice(0, v)))
  useMotionValueEvent(responseLength, 'change', (v) => setTypedResponse(RESPONSE.slice(0, v)))
  useMotionValueEvent(active, 'change', (v) => {
    setIsTyping(v > IDLE_END && v < PAUSE_END)
    setIsSent(v >= PAUSE_END)
  })

  const isResponding = isSent
  const isResponseTyping = isResponding && typedResponse.length < RESPONSE.length
  // Send button turns into a stop control (dark bg, stop-square icon) for the
  // whole stretch there's something running to interrupt — the user's own
  // query being typed, and the reply typing out after it — then reverts once
  // the reply has fully landed and there's nothing left to stop.
  const isBusy = isTyping || isResponseTyping

  return (
    <div className="relative overflow-hidden" style={{ width: DESIGN_W, height: DESIGN_H }}>
      {notch ? (
        // White backing everywhere except a matching cutout for the model's physical
        // dynamic island, built from four plain rects rather than a full-bleed fill.
        <>
          <div className="absolute inset-x-0 top-0 bg-white" style={{ height: Math.max(notch.top, 0) }} />
          <div className="absolute inset-x-0 bottom-0 bg-white" style={{ top: notch.top + notch.height }} />
          <div
            className="absolute left-0 bg-white"
            style={{ top: notch.top, height: notch.height, width: `calc(50% - ${notch.width / 2}px)` }}
          />
          <div
            className="absolute right-0 bg-white"
            style={{ top: notch.top, height: notch.height, width: `calc(50% - ${notch.width / 2}px)` }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}

      {/* Standalone status bar (no real phone photo behind this canvas). When used
          inside PhoneMockup, this is skipped — that component draws its own single
          shared status row above this canvas instead (the island itself is
          revealed from the photo via the cutout above, not drawn). */}
      {showStatusBar && (
        <div className="absolute left-0 top-0 z-20 flex h-[44px] w-[360px] items-center justify-between px-4">
          <span className="font-gsans text-[15.7px] font-semibold tracking-[-0.01em] text-[#010101]">9:30</span>
          <img src={rightSideIcon} alt="" className="h-3 w-[71px]" />
        </div>
      )}

      {/* Top bar (menu + avatar) */}
      <div className="absolute left-4 z-20 h-8 w-8" style={{ top: 56 }}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#eaeae6] bg-white shadow-[0_0_1.6px_rgba(0,0,0,0.14)]">
          <img src={menuIcon} alt="" className="h-5 w-5" />
        </div>
      </div>
      <div className="absolute z-20 h-8 w-8" style={{ left: 312, top: 56 }}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#eaeae6] bg-white text-[13px] font-medium text-[#1e1e1a] shadow-[0_0_1.6px_rgba(0,0,0,0.14)]">
          A
        </div>
      </div>

      {/* Greeting */}
      <p
        className="absolute left-4 font-gsans text-[28px] font-bold leading-[36px] text-[#1e1e1a]"
        style={{ top: 116, width: 167 }}
      >
        Hey you,
      </p>

      {/* The user's sent query, moved out of the input box into its own bubble */}
      <AnimatePresence>
        {isSent && (
          <motion.div
            key="sent-query"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute max-w-[320px] whitespace-nowrap rounded-bl-2xl rounded-br-2xl rounded-tl-2xl border border-[#eaeae6] bg-white px-4 py-3"
            style={{ right: 16, top: 168 }}
          >
            <span className="text-right font-gsans text-[14px] leading-5 text-[#1e1e1a]">{QUERY}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI response */}
      <AnimatePresence>
        {isResponding && (
          <motion.p
            key="response"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute left-4 whitespace-pre-line font-gsans text-[14px] leading-5 text-[#1e1e1a]"
            style={{ top: 248, width: 320 }}
          >
            {typedResponse}
            {typedResponse.length < RESPONSE.length && '|'}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Bottom navigation */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex min-h-[172px] w-[360px] flex-col items-center overflow-hidden rounded-t-[24px] border border-[#eaeae6] bg-white pt-4">
        <div className="w-full px-4 py-3">
          <div className="flex min-h-12 w-full items-center justify-between rounded-[24px] border border-[#eaeae6] bg-white py-2 pl-4 pr-2">
            <p className="line-clamp-2 min-w-0 flex-1 font-gsans text-[14px] leading-5 text-[#858679]">
              {isTyping ? (
                <>
                  <span className="text-[#1e1e1a]">{typedQuery}</span>
                  <span className="text-[#1e1e1a]">|</span>
                </>
              ) : (
                <>
                  <span className="text-[#1e1e1a]">|</span>Ask me anything
                </>
              )}
            </p>
            <div className="flex items-center gap-2 pl-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <img src={micIcon} alt="" className="h-6 w-6" />
              </div>
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                style={{ backgroundColor: isBusy ? '#1e1e1a' : '#858679' }}
              >
                <img src={isBusy ? stopIcon : arrowUpIcon} alt="" className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[60px] w-full items-center">
          {NAV_ITEMS.map(({ key, label, icon, active: navActive }) => (
            <div key={key} className="flex h-full flex-1 flex-col items-center gap-1 py-2">
              <img src={icon} alt="" className="h-6 w-6" />
              <p
                className="font-gsans text-[10px] font-medium leading-4"
                style={{ color: navActive ? '#1e1e1a' : '#858679' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex h-6 w-full items-center justify-center">
          <div className="h-1 w-24 rounded-full bg-[#1e1e1a]" />
        </div>
      </div>
    </div>
  )
}
