"use client"

import { Github, Linkedin, Twitter, Mail, Globe, Instagram, Youtube, Facebook } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Twitter: <Twitter className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  Youtube: <Youtube className="h-5 w-5" />,
  Facebook: <Facebook className="h-5 w-5" />,
}

interface SocialIconProps {
  icon: string | null
}

export function SocialIcon({ icon }: SocialIconProps) {
  return iconMap[icon || ""] || <Globe className="h-5 w-5" />
}
