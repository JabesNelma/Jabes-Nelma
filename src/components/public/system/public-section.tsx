import * as React from "react"

import { cn } from "@/lib/utils"

interface PublicSectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export function PublicSection({ children, className, containerClassName }: PublicSectionProps) {
  return (
    <section className={cn("section-shell", className)}>
      <div className={cn("layout-container", containerClassName)}>{children}</div>
    </section>
  )
}
