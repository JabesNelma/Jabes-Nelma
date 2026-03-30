import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"
import { normalizeSocialPlatform } from "@/lib/social-platforms"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const socialLink = await db.socialLink.findUnique({
      where: { id },
    })

    if (!socialLink) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 })
    }

    return NextResponse.json({ socialLink })
  } catch (error) {
    console.error("Error fetching social link:", error)
    return NextResponse.json({ error: "Failed to fetch social link" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.socialLink.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 })
    }

    let platform = normalizeSocialPlatform(existing.platform) ?? existing.platform
    if (typeof body.platform === "string") {
      const normalized = normalizeSocialPlatform(body.platform)
      if (!normalized) {
        return NextResponse.json({ error: "Invalid social platform" }, { status: 400 })
      }
      platform = normalized
    }

    let url = existing.url
    if (typeof body.url === "string") {
      const trimmed = body.url.trim()
      if (!trimmed || !URL.canParse(trimmed)) {
        return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
      }
      url = trimmed
    }

    const socialLink = await db.socialLink.update({
      where: { id },
      data: {
        platform,
        url,
        isActive: typeof body.isActive === "boolean" ? body.isActive : existing.isActive,
        order: typeof body.order === "number" ? body.order : existing.order,
      },
    })

    return NextResponse.json({ socialLink })
  } catch (error) {
    console.error("Error updating social link:", error)
    return NextResponse.json({ error: "Failed to update social link" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.socialLink.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 })
    }

    await db.socialLink.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting social link:", error)
    return NextResponse.json({ error: "Failed to delete social link" }, { status: 500 })
  }
}
