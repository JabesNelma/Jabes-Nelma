"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Briefcase,
  Mail,
  Settings,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/internal-portal-xyz",
    icon: LayoutDashboard,
  },
  {
    title: "Proyek",
    href: "/internal-portal-xyz/projects",
    icon: FolderKanban,
  },
  {
    title: "Keahlian",
    href: "/internal-portal-xyz/skills",
    icon: Wrench,
  },
  {
    title: "Pengalaman",
    href: "/internal-portal-xyz/experience",
    icon: Briefcase,
  },
  {
    title: "Pesan",
    href: "/internal-portal-xyz/messages",
    icon: Mail,
  },
  {
    title: "Social Links",
    href: "/internal-portal-xyz/social-links",
    icon: Share2,
  },
  {
    title: "Setelan Situs",
    href: "/internal-portal-xyz/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [siteName, setSiteName] = React.useState("Portfolio CMS")
  const [logoUrl, setLogoUrl] = React.useState("")

  React.useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch("/api/public/site-config")
        const data = await response.json()
        const config = data.data || data.config || {}

        setSiteName(config.siteName || "Portfolio CMS")
        setLogoUrl(config.siteLogoUrl || "")
      } catch {
        // Keep fallback brand when config request fails.
      }
    }

    fetchConfig()
  }, [])

  const isActive = (href: string) => {
    if (href === "/internal-portal-xyz") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 68 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="relative flex h-full flex-col border-r bg-sidebar"
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-primary">
                {logoUrl ? (
                  <Image src={logoUrl} alt={siteName} fill className="object-cover" />
                ) : (
                  <span className="text-sm font-bold text-primary-foreground">
                    {siteName.charAt(0).toUpperCase() || "P"}
                  </span>
                )}
              </div>
              <span className="font-semibold text-sidebar-foreground">{siteName}</span>
            </motion.div>
          )}
          {collapsed && (
            <div className="relative mx-auto flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-primary">
              {logoUrl ? (
                <Image src={logoUrl} alt={siteName} fill className="object-cover" />
              ) : (
                <span className="text-sm font-bold text-primary-foreground">
                  {siteName.charAt(0).toUpperCase() || "P"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const active = isActive(item.href)
              const Icon = item.icon

              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                      >
                        <Icon className={cn("h-5 w-5 shrink-0", active && "text-primary")} />
                        {!collapsed && <span>{item.title}</span>}
                      </motion.div>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="font-medium">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Collapse Toggle */}
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full justify-center"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </motion.aside>
    </TooltipProvider>
  )
}
