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
  FileText,
  Settings,
  Share2,
  Menu,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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
    title: "Projects",
    href: "/internal-portal-xyz/projects",
    icon: FolderKanban,
  },
  {
    title: "Skills",
    href: "/internal-portal-xyz/skills",
    icon: Wrench,
  },
  {
    title: "Experience",
    href: "/internal-portal-xyz/experience",
    icon: Briefcase,
  },
  {
    title: "Messages",
    href: "/internal-portal-xyz/messages",
    icon: Mail,
  },
  {
    title: "Blog Posts",
    href: "/internal-portal-xyz/blog",
    icon: FileText,
  },
  {
    title: "Social Links",
    href: "/internal-portal-xyz/social-links",
    icon: Share2,
  },
  {
    title: "Site Settings",
    href: "/internal-portal-xyz/settings",
    icon: Settings,
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-primary">
              {logoUrl ? (
                <Image src={logoUrl} alt={siteName} fill className="object-cover" />
              ) : (
                <span className="text-sm font-bold text-primary-foreground">
                  {siteName.charAt(0).toUpperCase() || "P"}
                </span>
              )}
            </div>
            <span>{siteName}</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-60px)]">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item, index) => {
              const active = isActive(item.href)
              const Icon = item.icon

              return (
                <React.Fragment key={item.href}>
                  {index > 0 && item.title === "Site Settings" && (
                    <Separator className="my-2" />
                  )}
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                  </Link>
                </React.Fragment>
              )
            })}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
