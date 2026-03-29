import * as React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PublicCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
}

export function PublicCard({ children, className, ...props }: PublicCardProps) {
  return (
    <Card
      className={cn(
        "ds-card-base group relative overflow-hidden border-border/70 bg-card/95 transition-all duration-300 hover:border-sky-500/40 hover:shadow-[0_20px_40px_-24px_rgba(14,165,233,0.45)]",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
}
