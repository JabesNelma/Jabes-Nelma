import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    let about = await db.about.findFirst()

    if (!about) {
      about = await db.about.create({
        data: {
          bio: "Add your bio here...",
          email: "your@email.com",
        },
      })
    }

    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const existing = await db.about.findFirst()

    let about
    if (existing) {
      about = await db.about.update({
        where: { id: existing.id },
        data: {
          bio: data.bio,
          avatarUrl: data.avatarUrl,
          email: data.email,
          phone: data.phone,
          location: data.location,
          resumeUrl: data.resumeUrl,
        },
      })
    } else {
      about = await db.about.create({
        data: {
          bio: data.bio,
          avatarUrl: data.avatarUrl,
          email: data.email,
          phone: data.phone,
          location: data.location,
          resumeUrl: data.resumeUrl,
        },
      })
    }

    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 })
  }
}
