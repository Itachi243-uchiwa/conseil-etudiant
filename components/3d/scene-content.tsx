"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

function Logo() {
  const group = useRef()

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Sphère primaire (bleu) */}
      <mesh position={[-1.5, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#00A8E8" />
      </mesh>

      {/* Sphère secondaire (violet) */}
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#9C27B0" />
      </mesh>

      {/* Sphère tertiaire (rouge) */}
      <mesh position={[0, -2, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#F44336" />
      </mesh>
    </group>
  )
}

export default function Scene3DContent() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Logo />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
