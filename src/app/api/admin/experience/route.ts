import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/admin/experience - List all experiences
export async function GET() {
  try {
    const experiences = await db.experience.findMany({
      orderBy: [
        { order: "desc" },
        { startDate: "desc" },
      ],
    })

    return NextResponse.json({ experiences })
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    )
  }
}

// POST /api/admin/experience - Create new experience
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      role,
      company,
      location,
      description,
      startDate,
      endDate,
      current,
      technologies,
      order,
    } = body

    // Validate required fields
    if (!role || !company || !description || !startDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const experience = await db.experience.create({
      data: {
        role,
        company,
        location: location || null,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        technologies: technologies || null,
        order: order || 0,
      },
    })

    return NextResponse.json({ experience }, { status: 201 })
  } catch (error) {
    console.error("Error creating experience:", error)
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    )
  }
}
