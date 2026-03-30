"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { fallbackSocialIcon, socialIconMap, getSocialLabel } from "@/lib/social-icon-map"
import { type SocialPlatform } from "@/lib/social-platforms"

interface SocialLink {
  id: string
  platform: SocialPlatform
  url: string
  order: number
}

interface SiteConfig {
  contactEmail: string
  siteAuthor: string
}

export function ContactInfo() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [config, setConfig] = useState<SiteConfig | null>(null)

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
          setConfig(data.config)
        }
      } catch (error) {
        console.error("Error fetching contact info:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Contact Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>

            {/* Email */}
            {config?.contactEmail && (
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {config.contactEmail}
                  </a>
                </div>
              </div>
            )}

            {/* Location placeholder */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">Remote / Worldwide</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Links Card */}
      {socialLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
              <div className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.platform] || fallbackSocialIcon
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{getSocialLabel(link.platform)}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {link.url}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
