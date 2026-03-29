import * as React from "react"

import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
  className?: string
  as?: "h1" | "h2"
}

export function SectionHeader({ title, subtitle, eyebrow, className, as = "h2" }: SectionHeaderProps) {
  const Heading = as

  return (
    <div className={cn("mx-auto flex max-w-2xl flex-col items-center text-center ds-gap-sm", className)}>
      {eyebrow ? <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600/80">{eyebrow}</p> : null}
      <Heading className="ds-heading text-balance font-semibold tracking-tight">{title}</Heading>
      {subtitle ? <p className="ds-subheading max-w-2xl text-pretty">{subtitle}</p> : null}
    </div>
  )
}
