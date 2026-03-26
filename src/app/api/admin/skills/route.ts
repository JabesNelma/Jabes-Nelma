import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    })
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const count = await db.skill.count()

    const skill = await db.skill.create({
      data: {
        name: data.name,
        category: data.category,
        level: data.level,
        icon: data.icon,
        order: count,
      },
    })

    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
