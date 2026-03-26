import Link from "next/link"
import { db } from "@/lib/db"
import { SocialIcon } from "./SocialIcon"

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string | null
}

export async function Footer() {
  const socialLinks = await db.socialLink.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur-md mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 sm:py-8 px-4 md:flex-row">
        <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
        <div className="flex items-center gap-3 sm:gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SocialIcon icon={link.icon} />
              <span className="sr-only">{link.platform}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/login"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Admin
        </Link>
      </div>
    </footer>
  )
}
