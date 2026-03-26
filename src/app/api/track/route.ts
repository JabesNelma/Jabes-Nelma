import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { headers } from "next/headers"

export async function POST(req: Request) {
  try {
    const { path, referrer } = await req.json()
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"

    // Skip tracking for admin/api paths
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true })
    }

    await db.pageView.create({
      data: {
        path,
        ip: typeof ip === "string" ? ip.slice(0, 15) : "unknown",
        userAgent: headersList.get("user-agent") || undefined,
        referrer: referrer || undefined,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Tracking error:", error)
    return NextResponse.json({ ok: true }) // Still return ok to not break the frontend
  }
}
