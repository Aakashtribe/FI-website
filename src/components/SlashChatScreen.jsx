import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent } from 'framer-motion'
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

const GREETING = 'Hey you,'
const QUERY = 'My budget is chaos. Help me fix it. 🔥'
const RESPONSE = "Don't worry, I've seen worse. 😌\nI'm about to investigate your finances like a true crime documentary."

const NAV_ITEMS = [
  { key: 'slash', label: 'Slash', icon: slashAiIcon, active: true },
  { key: 'spends', label: 'Spends', icon: creditCardIcon, active: false },
  { key: 'assets', label: 'Assets', icon: safeBoxIcon, active: false },
  { key: 'fd', label: 'FD', icon: bankIcon, active: false },
]

// The screen content only, sized to fill its parent — no phone chrome of its own.
// `active` is a Framer Motion value (0-1): the play loop starts on the rising edge
// and freezes back to idle on the falling edge, so it can be gated by scroll.
export default function SlashChatScreen({ active, notch, showStatusBar = true }) {
  // greeting -> idle -> typing -> responding (sent query + AI reply, instant —
  // no loading state), then holds there. Plays once — no auto-loop — and only
  // replays if the section leaves the viewport and comes back (`running`
  // going false then true again).
  const [phase, setPhase] = useState('greeting')
  const [typedGreeting, setTypedGreeting] = useState('')
  const [typedQuery, setTypedQuery] = useState('')
  const [typedResponse, setTypedResponse] = useState('')
  const [running, setRunning] = useState(active ? active.get() > 0.5 : true)
  const startedRef = useRef(running)

  useMotionValueEvent(active, 'change', (v) => {
    if (v > 0.5 && !startedRef.current) {
      startedRef.current = true
      setRunning(true)
    } else if (v <= 0.5 && startedRef.current) {
      startedRef.current = false
      setRunning(false)
      setPhase('greeting')
      setTypedGreeting('')
      setTypedQuery('')
      setTypedResponse('')
    }
  })

  // The greeting types out the same way the query and reply do, instead of
  // appearing as a finished block — the very first thing the screen does.
  useEffect(() => {
    if (!running || phase !== 'greeting') return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTypedGreeting(GREETING.slice(0, i))
      if (i >= GREETING.length) {
        clearInterval(id)
        setTimeout(() => setPhase('idle'), 400)
      }
    }, 42)
    return () => clearInterval(id)
  }, [running, phase])

  useEffect(() => {
    if (!running || phase !== 'idle') return
    const t = setTimeout(() => setPhase('typing'), 900)
    return () => clearTimeout(t)
  }, [running, phase])

  useEffect(() => {
    if (!running || phase !== 'typing') return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTypedQuery(QUERY.slice(0, i))
      if (i >= QUERY.length) {
        clearInterval(id)
        setTimeout(() => setPhase('responding'), 450)
      }
    }, 42)
    return () => clearInterval(id)
  }, [running, phase])

  // The AI reply is typed out the same way the query was — same per-character
  // interval — rather than just fading in as a finished block. Once fully typed,
  // it just holds there (no further phase transition, no reset).
  useEffect(() => {
    if (!running || phase !== 'responding') return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTypedResponse(RESPONSE.slice(0, i))
      if (i >= RESPONSE.length) clearInterval(id)
    }, 42)
    return () => clearInterval(id)
  }, [running, phase])

  // The input box only shows live characters while actually typing; once sent, it
  // resets to the placeholder and the typed query moves into its own bubble instead.
  const isTyping = phase === 'typing'
  const isSent = phase === 'responding'
  const isResponding = phase === 'responding'
  const isResponseTyping = isResponding && typedResponse.length < RESPONSE.length
  // Three distinct button states: grey arrow (idle, nothing to send), dark
  // arrow (user is typing their own query — "active" send button), dark
  // stop-square (query sent, reply typing out — the only thing you'd
  // actually want to interrupt). The bg goes dark for both busy states;
  // only the icon itself distinguishes typing-your-own-query from the
  // reply streaming back.
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

      {/* Greeting — types out the same way the query and reply do */}
      <p
        className="absolute left-4 font-gsans text-[28px] font-bold leading-[36px] text-[#1e1e1a]"
        style={{ top: 116, width: 167 }}
      >
        {typedGreeting}
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
                <img src={isResponseTyping ? stopIcon : arrowUpIcon} alt="" className="h-6 w-6" />
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
