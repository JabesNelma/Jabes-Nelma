import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { normalizeSocialPlatform } from "@/lib/social-platforms"

export async function GET() {
  try {
    const socialLinksRaw = await db.socialLink.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        platform: true,
        url: true,
        order: true,
      },
      orderBy: {
        order: "asc",
      },
    })

    const socialLinks = socialLinksRaw
      .map((link) => {
        const normalizedPlatform = normalizeSocialPlatform(link.platform)
        if (!normalizedPlatform) {
          return null
        }

        return {
          ...link,
          platform: normalizedPlatform,
        }
      })
      .filter((link): link is NonNullable<typeof link> => link !== null)

    return NextResponse.json({ socialLinks })
  } catch (error) {
    console.error("Social links error:", error)
    return NextResponse.json({ socialLinks: [] })
  }
}
