import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    let focus = await db.currentFocus.findFirst()

    if (!focus) {
      focus = await db.currentFocus.create({
        data: {
          title: "Current Focus",
          description: "What are you working on?",
        },
      })
    }

    return NextResponse.json(focus)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch current focus" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const existing = await db.currentFocus.findFirst()

    let focus
    if (existing) {
      focus = await db.currentFocus.update({
        where: { id: existing.id },
        data: {
          title: data.title,
          description: data.description,
          icon: data.icon,
        },
      })
    } else {
      focus = await db.currentFocus.create({
        data: {
          title: data.title,
          description: data.description,
          icon: data.icon,
        },
      })
    }

    return NextResponse.json(focus)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update current focus" }, { status: 500 })
  }
}
