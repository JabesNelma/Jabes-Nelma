"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/admin/sidebar"
import { TopBar } from "@/components/admin/topbar"
import { Toaster } from "@/components/ui/toaster"

// Mock user data - in real app, this would come from auth context
const mockUser = {
  name: "Admin User",
  email: "admin@portfolio.com",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)
  const isLoginPage = pathname === "/internal-portal-xyz/login"

  // Don't show sidebar and topbar on login page
  if (isLoginPage) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Bar */}
          <TopBar user={mockUser} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto p-4 md:p-6 lg:p-8"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
