import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent } from 'framer-motion'

const USER_MESSAGE = 'Help me manage my budget. Mine is a hell.'
const AI_RESPONSE =
  'Good news, you came to the right place. Bad news, your bank statements are about to testify against you.'

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h11" stroke="#1e1e1a" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="8" y="2" width="8" height="13" rx="4" stroke="#1e1e1a" strokeWidth="1.6" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="#1e1e1a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ArrowUpIcon({ color = 'white' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 19V5M5 12l7-7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BriefcaseIcon({ color = '#858679' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="7" width="18" height="13" rx="2.5" stroke={color} strokeWidth="1.6" />
      <path d="M8 7V6a4 4 0 018 0v1M3 12h18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SlashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M16 4L8 20" stroke="#1e1e1a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ThinkingBars() {
  return (
    <div className="flex h-4 items-center gap-[2px]">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full bg-[#858679]"
          animate={{ height: ['30%', '100%', '30%'] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function ChatScreen({ opacity }) {
  const [phase, setPhase] = useState('greeting')
  const [typedInput, setTypedInput] = useState('')
  const [responseText, setResponseText] = useState('')
  const [playKey, setPlayKey] = useState(0)
  const startedRef = useRef(false)

  useMotionValueEvent(opacity, 'change', (v) => {
    if (v > 0.6 && !startedRef.current) {
      startedRef.current = true
      setPlayKey((k) => k + 1)
    } else if (v < 0.05 && startedRef.current) {
      startedRef.current = false
      setPhase('greeting')
      setTypedInput('')
      setResponseText('')
    }
  })

  useEffect(() => {
    if (playKey === 0) return
    setPhase('greeting')
    setTypedInput('')
    setResponseText('')
    const t = setTimeout(() => setPhase('typing'), 500)
    return () => clearTimeout(t)
  }, [playKey])

  useEffect(() => {
    if (phase !== 'typing') return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTypedInput(USER_MESSAGE.slice(0, i))
      if (i >= USER_MESSAGE.length) {
        clearInterval(id)
        setTimeout(() => setPhase('sent'), 350)
      }
    }, 45)
    return () => clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase !== 'sent') return
    setTypedInput('')
    const t = setTimeout(() => setPhase('thinking'), 250)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'thinking') return
    const t = setTimeout(() => setPhase('responding'), 1200)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'responding') return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setResponseText(AI_RESPONSE.slice(0, i))
      if (i >= AI_RESPONSE.length) {
        clearInterval(id)
        setTimeout(() => setPhase('done'), 300)
      }
    }, 24)
    return () => clearInterval(id)
  }, [phase])

  const userSent = phase === 'sent' || phase === 'thinking' || phase === 'responding' || phase === 'done'
  const isTyping = typedInput.length > 0

  return (
    <motion.div style={{ opacity }} className="flex h-full w-full flex-col bg-white text-left">
      <div className="flex items-center justify-between px-5 pt-4">
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#eaeae6] bg-white shadow-sm">
          <MenuIcon />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e1e1a] text-sm font-medium text-white">
          A
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-5 pt-6">
        <p className="text-[26px] font-bold leading-[1.3] text-[#1e1e1a]">Hey you 👋</p>
        <p className="mt-1.5 text-[13px] leading-[1.5] text-[#4b4c43]">I'm tr/be, your personal finance companion.</p>

        {userSent && (
          <div className="mt-5 flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-[#eaeae6] bg-white px-4 py-2.5 text-[13px] text-[#1e1e1a]">
              {USER_MESSAGE}
            </div>
          </div>
        )}

        {phase === 'thinking' && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl rounded-tl-md py-1">
            <ThinkingBars />
            <p className="text-[13px] text-[#1e1e1a]">Working on it...</p>
          </div>
        )}

        {(phase === 'responding' || phase === 'done') && (
          <div className="mt-4 text-[13px] leading-[1.6] text-[#4b4c43]">{responseText}</div>
        )}
      </div>

      <div className="rounded-t-[24px] border border-[#eaeae6] bg-white/70 pt-5">
        <div className="px-5 py-2">
          <div className="flex items-center justify-between rounded-full border border-[#eaeae6] bg-white py-1.5 pl-4 pr-1.5">
            <p className="text-[13px] text-[#858679]">
              {isTyping ? (
                <>
                  <span className="text-[#1e1e1a]">{typedInput}</span>
                  <span className="text-[#1e1e1a]">|</span>
                </>
              ) : (
                <>
                  <span className="text-[#1e1e1a]">|</span> Ask me anything
                </>
              )}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full">
                <MicIcon />
              </div>
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200"
                style={{ backgroundColor: isTyping ? '#e8ff00' : '#858679' }}
              >
                <ArrowUpIcon color={isTyping ? '#1e1e1a' : 'white'} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-12 items-center">
          <div className="flex flex-1 flex-col items-center gap-0.5">
            <SlashIcon />
            <p className="text-[8px] font-medium text-[#1e1e1a]">Ask slash</p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5">
            <BriefcaseIcon />
            <p className="text-[8px] font-medium text-[#858679]">Portfolio</p>
          </div>
        </div>

        <div className="flex justify-center py-2">
          <div className="h-1 w-24 rounded-full bg-[#1e1e1a]" />
        </div>
      </div>
    </motion.div>
  )
}
