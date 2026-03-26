import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const configs = await db.siteConfig.findMany()
    const configMap: Record<string, string> = {}
    configs.forEach((c) => {
      configMap[c.key] = c.value
    })
    return NextResponse.json(configMap)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch site config" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    for (const [key, value] of Object.entries(data)) {
      await db.siteConfig.upsert({
        where: { key },
        update: { value: value as string },
        create: { key, value: value as string },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site config" }, { status: 500 })
  }
}
