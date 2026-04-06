"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavLinksProps {
  className?: string
  onLinkClick?: () => void
  variant?: "desktop" | "mobile"
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
]

export function NavLinks({ className, onLinkClick, variant = "desktop" }: NavLinksProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href.split("#")[0])
  }

  if (variant === "mobile") {
    return (
      <nav className={cn("flex flex-col gap-1", className)}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              "px-4 py-3 text-base font-medium rounded-lg transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive(item.href) && "bg-accent text-accent-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    )
  }

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className={cn(
            "relative px-3 py-2 text-sm font-medium transition-colors",
            "hover:text-foreground/80",
            isActive(item.href) ? "text-foreground" : "text-foreground/60"
          )}
        >
          {item.label}
          {isActive(item.href) && (
            <motion.div
              layoutId="activeNav"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
        </Link>
      ))}
    </nav>
  )
}
