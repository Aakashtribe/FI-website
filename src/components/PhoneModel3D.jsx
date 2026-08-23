import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'

// Swap this for the real asset path once the .glb is added to src/assets.
const MODEL_PATH = null

function Model() {
  const { scene } = useGLTF(MODEL_PATH)
  return <primitive object={scene} />
}

function Placeholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 0.1]} />
      <meshStandardMaterial color="#1e1e1a" />
    </mesh>
  )
}

export default function PhoneModel3D({ className }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        <Suspense fallback={<Placeholder />}>
          {MODEL_PATH ? <Model /> : <Placeholder />}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
