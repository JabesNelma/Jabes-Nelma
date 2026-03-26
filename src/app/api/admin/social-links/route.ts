import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const links = await db.socialLink.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(links)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch social links" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const count = await db.socialLink.count()

    const link = await db.socialLink.create({
      data: {
        platform: data.platform,
        url: data.url,
        icon: data.icon,
        order: count,
      },
    })

    return NextResponse.json(link)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create social link" }, { status: 500 })
  }
}
