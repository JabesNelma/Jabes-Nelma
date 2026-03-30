import {
  Facebook,
  Globe,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  Music2,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react"

import { socialPlatformLabels, type SocialPlatform } from "@/lib/social-platforms"

export const socialIconMap: Record<SocialPlatform, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  whatsapp: MessageCircle,
  gmail: Mail,
  telegram: Send,
  tiktok: Music2,
  website: Globe,
}

export const fallbackSocialIcon = Globe

export function getSocialIcon(platform: string): LucideIcon {
  const key = platform.trim().toLowerCase() as SocialPlatform
  return socialIconMap[key] || Globe
}

export function getSocialLabel(platform: string): string {
  const key = platform.trim().toLowerCase() as SocialPlatform
  return socialPlatformLabels[key] || platform
}
