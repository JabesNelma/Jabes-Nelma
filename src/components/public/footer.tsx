"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string | null
}

interface SiteConfig {
  siteName: string
  siteDescription: string
  siteAuthor: string
  contactEmail: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
]

export function Footer() {
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
        if (configData.config) {
          setConfig(configData.config)
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

  const getIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase()
    return iconMap[lowerPlatform] || ExternalLink
  }

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
            <h3 className="font-bold text-lg">{config.siteAuthor}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {config.siteDescription}
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
                const Icon = getIcon(link.platform)
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{link.platform}</span>
                  </motion.a>
                )
              })}
              {socialLinks.length === 0 && (
                <>
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </motion.a>
                </>
              )}
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
