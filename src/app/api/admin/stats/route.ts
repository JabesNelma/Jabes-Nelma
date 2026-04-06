import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would verify the auth token here
    // For now, we'll just return the stats

    const [projects, skills, messages] = await Promise.all([
      db.project.count(),
      db.skill.count(),
      db.message.count(),
    ])

    return NextResponse.json({
      stats: {
        projects,
        skills,
        messages,
      },
    })
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
