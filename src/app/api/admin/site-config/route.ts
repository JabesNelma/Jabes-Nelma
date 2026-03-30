import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"

const ALLOWED_KEYS = new Set([
  "ownerProfileImage",
  "siteLogoUrl",
])

async function getConfigMap() {
  const configs = await db.siteConfig.findMany({
    select: {
      key: true,
      value: true,
    },
  })

  return configs.reduce((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {} as Record<string, string>)
}

export async function GET() {
  try {
    const configMap = await getConfigMap()

    return NextResponse.json({
      success: true,
      data: configMap,
    })
  } catch (error) {
    console.error("Error fetching site config (admin):", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch site config" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    const entries = Object.entries(body).filter(
      (entry): entry is [string, string] => {
        const [key, value] = entry
        return ALLOWED_KEYS.has(key) && typeof value === "string"
      }
    )

    if (entries.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid config fields provided" },
        { status: 400 }
      )
    }

    await db.$transaction(
      entries.map(([key, value]) =>
        db.siteConfig.upsert({
          where: { key },
          update: { value: value.trim() },
          create: {
            key,
            value: value.trim(),
            description:
              key === "ownerProfileImage"
                ? "URL foto profil pemilik"
                : "URL logo situs",
          },
        })
      )
    )

    const configMap = await getConfigMap()

    return NextResponse.json({
      success: true,
      data: configMap,
    })
  } catch (error) {
    console.error("Error updating site config (admin):", error)
    return NextResponse.json(
      { success: false, error: "Failed to update site config" },
      { status: 500 }
    )
  }
}
