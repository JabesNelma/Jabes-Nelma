"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { fallbackSocialIcon, socialIconMap, getSocialLabel } from "@/lib/social-icon-map"
import { type SocialPlatform } from "@/lib/social-platforms"

interface SocialLink {
  id: string
  platform: SocialPlatform
  url: string
  order: number
}

export function PublicFooter() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [siteName, setSiteName] = useState("Portfolio")
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    async function fetchData() {
      try {
        const [socialRes, configRes] = await Promise.all([
          fetch("/api/public/social-links"),
          fetch("/api/public/site-config"),
        ])
        
        if (socialRes.ok) {
          const data = await socialRes.json()
          setSocialLinks(data.socialLinks || [])
        }
        
        if (configRes.ok) {
          const data = await configRes.json()
          setSiteName(data.config?.siteName || "Portfolio")
        }
      } catch (error) {
        console.error("Error fetching footer data:", error)
      }
    }
    
    fetchData()
  }, [])

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/25">
      <div className="layout-container py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className="text-lg font-semibold tracking-tight">
              Jabes Nelma <span className="text-primary">|</span> Full Stack Dev
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              Building resilient web products, thoughtful user experiences, and scalable systems.
            </p>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.platform] || fallbackSocialIcon
                return (
                  <Tooltip key={link.id}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        className="p-1.5 text-muted-foreground transition-all hover:text-primary hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.55)]"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{getSocialLabel(link.platform)}</span>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={8}>
                      {getSocialLabel(link.platform)}
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/70 pt-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} {siteName}. Crafted with precision.</p>
          <p>Next.js • TypeScript • Prisma • Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
