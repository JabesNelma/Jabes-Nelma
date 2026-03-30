export const socialPlatforms = [
  "github",
  "linkedin",
  "twitter",
  "instagram",
  "youtube",
  "facebook",
  "whatsapp",
  "gmail",
  "telegram",
  "tiktok",
  "website",
] as const

export type SocialPlatform = (typeof socialPlatforms)[number]

export const socialPlatformLabels: Record<SocialPlatform, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  gmail: "Gmail",
  telegram: "Telegram",
  tiktok: "TikTok",
  website: "Website",
}

export function isSocialPlatform(value: string): value is SocialPlatform {
  return socialPlatforms.includes(value as SocialPlatform)
}

export function normalizeSocialPlatform(value: string): SocialPlatform | null {
  const normalized = value.trim().toLowerCase()
  return isSocialPlatform(normalized) ? normalized : null
}
