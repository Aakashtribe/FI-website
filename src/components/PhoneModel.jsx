import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Html, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import modelUrl from '../assets/models/iphone-16.glb'
import skyImg from '../assets/Hero 3.jpg'
import SlashChatScreen from './SlashChatScreen.jsx'

// Real scanned GLB, not procedural — chosen for realism. Measured directly from the
// GLB's geometry (not eyeballed):
// - overall body bbox (mesh 25/33): x:[-3.592,3.592] y:[-7.369,7.369]
// - display glass (mesh 4): x:[-3.491,3.491] y:[-7.27,7.269] z:~0.39 (front face)
const BODY_HALF_H = 7.369
const SCREEN_HALF_W = 3.491
const SCREEN_HALF_H = 7.269
const SCREEN_Z = 0.39
const SCREEN_ASPECT = SCREEN_HALF_W / SCREEN_HALF_H

// Perspective camera distance/FOV chosen so the phone's height roughly fills the
// frame at rest — a true trapezoid/keystone tilt (per the reference) needs real
// perspective; an orthographic camera can't produce that foreshortening.
// MARGIN adds breathing room so the tilt's near-edge foreshortening doesn't clip.
const FOV = 35
const MARGIN = 1.22
const DIST = (BODY_HALF_H * 2 * MARGIN) / (2 * Math.tan(THREE.MathUtils.degToRad(FOV) / 2))

// CSS design size for the HTML overlay — sized to exactly match the screen's real
// aspect ratio, then shrunk into the scene via `scale` (CSS px -> world units).
const DESIGN_W = 360
const DESIGN_H = Math.round(DESIGN_W / SCREEN_ASPECT)
// drei's <Html transform> applies an internal 1/40 factor to convert the wrapped
// div's CSS pixel size into world units, so the true conversion needs 40x here.
const HTML_SCALE = (40 * (SCREEN_HALF_W * 2)) / DESIGN_W
// Matches the display's own rounded corners closely enough that the flat HTML
// rectangle doesn't poke past them into the bezel; a small inset margin keeps
// content off the true edge. The dynamic island is covered by the solid status
// bar rather than revealed through a cutout — the real scanned glass material
// picks up environment reflections there that read as a glitchy artifact.
const SCREEN_RADIUS = 72
const SCREEN_MARGIN = 14
const CONTENT_RADIUS = SCREEN_RADIUS - SCREEN_MARGIN

function Model({ rotateX, rotateY, active, contentOpacity, skyOpacity }) {
  const { scene } = useGLTF(modelUrl)
  const group = useRef()
  useFrame(() => {
    if (!group.current) return
    if (rotateX) group.current.rotation.x = THREE.MathUtils.degToRad(rotateX.get())
    if (rotateY) group.current.rotation.y = THREE.MathUtils.degToRad(rotateY.get())
  })
  return (
    <group ref={group}>
      <primitive object={scene} />
      <Html transform position={[0, 0, SCREEN_Z]} scale={HTML_SCALE} style={{ pointerEvents: 'none' }}>
        <div style={{ width: DESIGN_W, height: DESIGN_H, padding: SCREEN_MARGIN, boxSizing: 'border-box' }}>
          <div
            style={{ width: '100%', height: '100%', borderRadius: CONTENT_RADIUS, overflow: 'hidden', position: 'relative' }}
          >
            <motion.img
              src={skyImg}
              alt=""
              style={{ opacity: skyOpacity, position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <motion.div style={{ opacity: contentOpacity, position: 'absolute', inset: 0 }}>
              <SlashChatScreen active={active} />
            </motion.div>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default function PhoneModel({ className, rotateX, rotateY, active, contentOpacity, skyOpacity }) {
  return (
    <Canvas
      className={className}
      gl={{ alpha: false, antialias: true }}
      dpr={[1, 2]}
      resize={{ offsetSize: true }}
    >
      <color attach="background" args={['#ffffff']} />
      <PerspectiveCamera makeDefault position={[0, 0, DIST]} fov={FOV} near={0.1} far={100} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 8]} intensity={1.6} />
      <directionalLight position={[-4, -2, 4]} intensity={0.5} />
      <Suspense fallback={null}>
        <Model
          rotateX={rotateX}
          rotateY={rotateY}
          active={active}
          contentOpacity={contentOpacity}
          skyOpacity={skyOpacity}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
