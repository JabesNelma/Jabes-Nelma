"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { fallbackSocialIcon, socialIconMap, getSocialLabel } from "@/lib/social-icon-map"
import { type SocialPlatform } from "@/lib/social-platforms"

interface SocialLink {
  id: string
  platform: SocialPlatform
  url: string
  order: number
}

interface SiteConfig {
  siteName: string
  siteDescription: string
  siteAuthor: string
  contactEmail: string
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
]

export function Footer(_: { siteName?: string }) {
  const [config, setConfig] = useState<SiteConfig>({
    siteName: "Jabes Nelma Portfolio",
    siteDescription: "A personal portfolio website",
    siteAuthor: "Jabes Nelma",
    contactEmail: "jabesnelma056@gmail.com",
  })
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, socialRes] = await Promise.all([
          fetch("/api/public/site-config"),
          fetch("/api/public/social-links"),
        ])
        const configData = await configRes.json()
        const socialData = await socialRes.json()
        const nextConfig = configData.data || configData.config
        if (nextConfig) {
          setConfig((prev) => ({ ...prev, ...nextConfig }))
        }
        if (socialData.socialLinks) {
          setSocialLinks(socialData.socialLinks)
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error)
      }
    }
    fetchData()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="layout-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-lg">Jabes Nelma | Full Stack Dev</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {config.siteDescription || "Building resilient web products with practical engineering and modern design."}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.platform] || fallbackSocialIcon
                return (
                  <Tooltip key={link.id}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.97 }}
                        className="p-1.5 text-muted-foreground transition-all hover:text-primary hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.55)]"
                      >
                        <Icon className="h-4 w-4" />
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
            <div className="pt-2">
              <a
                href={`mailto:${config.contactEmail}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {config.contactEmail}
              </a>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <p>
            &copy; {currentYear} {config.siteAuthor}. All rights reserved.
          </p>
          <p className="text-xs">
            Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
