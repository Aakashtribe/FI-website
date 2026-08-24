import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import phoneFrame from '../assets/iPhone 16 Plus Dark with dynamic island.png'
import skyImg from '../assets/clouds-sky.jpg'
import rightSideIcon from '../assets/icons/right-side.svg'
import SlashChatScreen, { DESIGN_W, DESIGN_H } from './SlashChatScreen.jsx'

// Screen bounds measured from the source image (2229x4527), as % of the frame.
const SCREEN = { left: 3.63, top: 1.44, width: 92.64, height: 97.08 }
// The dynamic island is baked into this photo (unlike the "without" export) — a
// physical hardware cutout, always opaque, regardless of app content. So both the
// sky and the chat content punch a matching hole here instead of painting over it,
// letting the real photo's island show through cleanly. Position measured directly
// from this photo's pixels (spans design x~128-231, y~12-42), converted into
// SlashChatScreen's 360x800 design units via the screen box's own coordinate space.
const ISLAND = { top: 12, height: 30, width: 103 }

export default function PhoneMockup({
  active,
  contentOpacity,
  skyOpacity,
  statusBarColor,
  widthClassName = 'w-[220px] md:w-[260px]',
}) {
  const boxRef = useRef(null)
  // The screen box's own aspect ratio doesn't exactly match SlashChatScreen's fixed
  // 360x800 canvas, and the box's rendered pixel size varies by consumer (Hero uses
  // a fixed px width, FindMoney uses a viewport-relative one) — so the fit scale is
  // measured live from the box's actual size rather than hardcoded per breakpoint.
  // Uses offsetWidth/Height (layout size), NOT getBoundingClientRect — in Hero this
  // box sits inside an ancestor with its own scroll-driven `transform: scale()`,
  // and getBoundingClientRect includes that, double-counting it into this scale too.
  const [scale, setScale] = useState({ x: 1, y: 1 })
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => {
      const { offsetWidth: width, offsetHeight: height } = el
      if (width > 0 && height > 0) {
        setScale({ x: width / DESIGN_W, y: height / DESIGN_H })
        setBoxSize({ width, height })
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // The sky photo needs a hole punched over the island rect — otherwise it would
  // paint straight over the real baked-in island (it sits behind the chat content,
  // covering the full screen box). Expressed as a "keyhole" clip-path: the outer
  // rect's path connects to the (reverse-wound) hole via a zero-width slit, which
  // clips out the hole without needing multiple overflow-hidden windows — those
  // turned out fragile at the ~1-2% sliver heights involved here (thin windows onto
  // a large negatively-offset background image are prone to sub-pixel rendering
  // glitches in some browsers, occasionally painting blank).
  // The island is a true pill/stadium (radius = height/2), not a rounded rect with
  // a small radius — a plain rectangular hole left its 4 corners uncovered by the
  // real pill's curve, letting the wrong layer's color peek through there. Traced
  // in pixels (via boxSize) for correct circular geometry, then converted to % —
  // percentages alone would distort the arcs into ellipses whenever the box's
  // width/height don't scale 1:1.
  const skyClipPath = useMemo(() => {
    if (boxSize.width === 0 || boxSize.height === 0) return undefined
    const islandLeftPx = ((DESIGN_W - ISLAND.width) / 2 / DESIGN_W) * boxSize.width
    const islandRightPx = islandLeftPx + (ISLAND.width / DESIGN_W) * boxSize.width
    const islandTopPx = (ISLAND.top / DESIGN_H) * boxSize.height
    const islandBottomPx = ((ISLAND.top + ISLAND.height) / DESIGN_H) * boxSize.height
    const radius = (islandBottomPx - islandTopPx) / 2
    const centerY = (islandTopPx + islandBottomPx) / 2
    const leftCenterX = islandLeftPx + radius
    const rightCenterX = islandRightPx - radius

    const arc = (cx, cy, startDeg, endDeg, steps) => {
      const pts = []
      for (let i = 0; i <= steps; i++) {
        const deg = startDeg + ((endDeg - startDeg) * i) / steps
        const rad = (deg * Math.PI) / 180
        pts.push([cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)])
      }
      return pts
    }

    const holePoints = [
      [rightCenterX, islandTopPx],
      [leftCenterX, islandTopPx],
      ...arc(leftCenterX, centerY, -90, -270, 16), // left cap, bulging left
      [rightCenterX, islandBottomPx],
      ...arc(rightCenterX, centerY, 90, -90, 16), // right cap, bulging right, back to start
    ]
    const toPct = ([x, y]) => `${(x / boxSize.width) * 100}% ${(y / boxSize.height) * 100}%`

    return `polygon(
      0% 0%, 0% 100%, 100% 100%, 100% 0%,
      ${toPct([rightCenterX, 0])},
      ${holePoints.map(toPct).join(', ')},
      ${toPct([rightCenterX, 0])}
    )`
  }, [boxSize.width, boxSize.height])

  return (
    <div className={`relative ${widthClassName}`} style={{ aspectRatio: '2229 / 4527' }}>
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
          borderRadius: `13% / ${13 * ((SCREEN.width / SCREEN.height) * (2229 / 4527))}%`,
        }}
      >
        <motion.img
          src={skyImg}
          alt=""
          style={{
            opacity: skyOpacity,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            clipPath: skyClipPath,
          }}
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
            <SlashChatScreen active={active} showStatusBar={false} notch={ISLAND} />
          </div>
        </motion.div>

        {/* One shared status row, drawn once above both layers — not two copies
            crossfading independently, which doubled into blurry overlapping text
            during the sky/content handoff. Text color interpolates smoothly
            (matching Nav's own textColor trick); the icon crossfades between a
            white and dark copy instead, which is fine for a small graphic. The
            island itself needs no drawing — it's revealed from the photo above. */}
        <div
          className="absolute z-20 flex items-center justify-between"
          style={{
            top: ISLAND.top * scale.y,
            height: ISLAND.height * scale.y,
            left: 0,
            width: boxSize.width,
            paddingLeft: 22 * scale.x,
            paddingRight: 22 * scale.x,
          }}
        >
          <motion.span
            className="font-normal tracking-[-0.01em]"
            style={{
              fontSize: 15.7 * scale.y,
              color: statusBarColor,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
            }}
          >
            10:20
          </motion.span>
          <div className="relative" style={{ height: 12 * scale.y, width: 71 * scale.y }}>
            <motion.img
              src={rightSideIcon}
              alt=""
              style={{ opacity: skyOpacity, position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'invert(1) brightness(2)' }}
            />
            <motion.img
              src={rightSideIcon}
              alt=""
              style={{ opacity: contentOpacity, position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
