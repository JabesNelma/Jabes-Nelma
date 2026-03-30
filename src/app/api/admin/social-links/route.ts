import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"
import { normalizeSocialPlatform } from "@/lib/social-platforms"

export async function GET() {
  try {
    let socialLinksRaw: Array<{
      id: string
      platform: string
      url: string
      isActive: boolean
      order: number
      createdAt: Date
      updatedAt: Date
    }> = []

    try {
      socialLinksRaw = await db.socialLink.findMany({
        orderBy: {
          order: "asc",
        },
      })
    } catch {
      // Fallback for legacy schema that does not have `isActive` / `order` yet.
      const legacyRows = await db.$queryRawUnsafe<Array<{
        id: string
        platform: string
        url: string
      }>>("SELECT id, platform, url FROM SocialLink")

      socialLinksRaw = legacyRows.map((row, index) => ({
        ...row,
        isActive: true,
        order: index,
        createdAt: new Date(0),
        updatedAt: new Date(0),
      }))
    }

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
    console.error("Error fetching social links:", error)
    return NextResponse.json({ error: "Failed to fetch social links" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const platform = typeof body.platform === "string" ? normalizeSocialPlatform(body.platform) : null
    const url = typeof body.url === "string" ? body.url.trim() : ""
    const isActive = typeof body.isActive === "boolean" ? body.isActive : true

    if (!platform || !url) {
      return NextResponse.json(
        { error: "Platform and URL are required" },
        { status: 400 }
      )
    }

    const parsedUrl = URL.canParse(url)
    if (!parsedUrl) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    const maxOrderItem = await db.socialLink.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const socialLink = await db.socialLink.create({
      data: {
        platform,
        url,
        isActive,
        order: (maxOrderItem?.order || 0) + 1,
      },
    })

    return NextResponse.json({ socialLink }, { status: 201 })
  } catch (error) {
    console.error("Error creating social link:", error)
    return NextResponse.json({ error: "Failed to create social link" }, { status: 500 })
  }
}
