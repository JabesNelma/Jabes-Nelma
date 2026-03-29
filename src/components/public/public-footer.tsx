"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { useEffect, useState } from "react"

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string | null
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

export function PublicFooter() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [siteName, setSiteName] = useState("Portfolio")

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

  const getIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase()
    return iconMap[lowerPlatform] || Mail
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="layout-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = getIcon(link.platform)
                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.platform}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
