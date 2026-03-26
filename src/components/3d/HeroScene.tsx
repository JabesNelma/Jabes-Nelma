"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, TorusKnot, Float, MeshDistortMaterial, GradientTexture } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { useTheme } from "@/components/theme-provider"
import * as THREE from "three"

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { resolvedTheme } = useTheme()
  
  // Animate rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 32]} scale={1.5}>
        <meshStandardMaterial
          attach="material"
          roughness={0.15}
          metalness={0.9}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={
              resolvedTheme === "dark"
                ? ["#f43f5e", "#ec4899", "#a855f7"] // Rose to Pink to Purple
                : ["#dc2626", "#ea580c", "#f59e0b"] // Red to Orange to Amber
            }
            size={1024}
          />
        </meshStandardMaterial>
      </TorusKnot>
    </Float>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f43f5e" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#a855f7" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <AnimatedShape />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
