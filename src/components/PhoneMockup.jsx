import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import phoneFrame from '../assets/iphone-16-plus-light.png'
import skyImg from '../assets/Hero 3.jpg'
import SlashChatScreen, { DESIGN_W, DESIGN_H } from './SlashChatScreen.jsx'

// Screen bounds measured from the source image (2030x4123), as % of the frame.
const SCREEN = { left: 3.55, top: 1.48, width: 92.8, height: 96.85 }
// The whole baked-in status row (time text, dynamic island, signal/wifi/battery),
// measured directly from the photo and converted into the screen box's own
// coordinate space, then into SlashChatScreen's 360x800 design units — wide enough
// to clear the time text on the left and the battery icon on the right, not just
// the island itself in the middle. The canvas overlays the box from y=0, so this
// sits at the same real position as the physical status bar/island — no shift needed.
// Height re-measured directly from the PNG's pixels (island spans design y~11.4-41.5);
// the old height of 26 stopped at y=37, clipping the island's rounded bottom edge.
const STATUS_ROW = { top: 10, height: 32, width: 300 }

export default function PhoneMockup({ active, contentOpacity, skyOpacity, widthClassName = 'w-[290px] md:w-[340px]' }) {
  const boxRef = useRef(null)
  // The screen box's own aspect ratio doesn't exactly match SlashChatScreen's fixed
  // 360x800 canvas, and the box's rendered pixel size varies by consumer (Hero uses
  // a fixed px width, FindMoney uses a viewport-relative one) — so the fit scale is
  // measured live from the box's actual size rather than hardcoded per breakpoint.
  // Uses offsetWidth/Height (layout size), NOT getBoundingClientRect — in Hero this
  // box sits inside an ancestor with its own scroll-driven `transform: scale()`,
  // and getBoundingClientRect includes that, double-counting it into this scale too.
  const [scale, setScale] = useState({ x: 1, y: 1 })

  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => {
      const { offsetWidth: width, offsetHeight: height } = el
      if (width > 0 && height > 0) setScale({ x: width / DESIGN_W, y: height / DESIGN_H })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className={`relative ${widthClassName}`} style={{ aspectRatio: '2030 / 4123' }}>
      <img src={phoneFrame} alt="" className="absolute inset-0 z-0 h-full w-full select-none" draggable={false} />

      <div
        ref={boxRef}
        className="absolute z-10 overflow-hidden"
        style={{
          left: `${SCREEN.left}%`,
          top: `${SCREEN.top}%`,
          width: `${SCREEN.width}%`,
          height: `${SCREEN.height}%`,
          // The box is much taller than wide, so a single % radius would stretch into an
          // ellipse. Scale the vertical % by the box's own aspect ratio to keep it circular.
          borderRadius: `13% / ${13 * ((SCREEN.width / SCREEN.height) * (2030 / 4123))}%`,
        }}
      >
        <motion.img
          src={skyImg}
          alt=""
          style={{ opacity: skyOpacity, position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <motion.div style={{ opacity: contentOpacity, position: 'absolute', inset: 0 }}>
          {/* SlashChatScreen is a fixed 360x800 canvas (pixel-exact to the Figma design).
              The screen box's aspect ratio doesn't exactly match the canvas's (360:800),
              so a single uniform scale can only fill one dimension without either a side
              margin or clipping the bottom. Scaling X and Y independently (measured live
              above) fills the box exactly in both directions — the small stretch this
              introduces is imperceptible here. */}
          <div
            className="origin-top-left"
            style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale.x}, ${scale.y})` }}
          >
            <SlashChatScreen active={active} showStatusBar={false} notch={STATUS_ROW} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
