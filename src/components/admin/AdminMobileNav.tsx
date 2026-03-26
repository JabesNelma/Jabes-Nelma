"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  User,
  Focus,
  Link2,
  Wrench,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/current-focus", label: "Current Focus", icon: Focus },
  { href: "/admin/social-links", label: "Social Links", icon: Link2 },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/site-config", label: "Site Config", icon: Settings },
]

export function AdminMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]">
            <nav className="space-y-1 mt-8">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="mt-8 pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
              <Link href="/" className="block mt-2" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  View Site
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
