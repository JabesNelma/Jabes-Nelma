"use client"

import dynamic from "next/dynamic"

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
)

export function HeroSceneWrapper() {
  return <HeroScene />
}
