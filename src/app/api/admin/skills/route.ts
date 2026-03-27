import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/admin/skills - List all skills with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const sortBy = searchParams.get("sortBy") || "order"
    const sortOrder = searchParams.get("sortOrder") || "asc"

    // Build where clause
    const where: {
      name?: { contains: string; mode: "insensitive" }
      category?: string
    } = {}

    if (search) {
      where.name = { contains: search, mode: "insensitive" }
    }

    if (category) {
      where.category = category
    }

    // Get skills
    const skills = await db.skill.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
    })

    return NextResponse.json({ skills })
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    )
  }
}

// POST /api/admin/skills - Create new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, icon, proficiency, order } = body

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and category are required" },
        { status: 400 }
      )
    }

    // Validate category
    const validCategories = ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"]
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category. Must be one of: " + validCategories.join(", ") },
        { status: 400 }
      )
    }

    // Validate proficiency
    const proficiencyValue = typeof proficiency === "number" ? proficiency : 80
    if (proficiencyValue < 0 || proficiencyValue > 100) {
      return NextResponse.json(
        { error: "Proficiency must be between 0 and 100" },
        { status: 400 }
      )
    }

    // Get the max order for new skill if not provided
    let skillOrder = order
    if (skillOrder === undefined || skillOrder === null) {
      const maxOrderSkill = await db.skill.findFirst({
        orderBy: { order: "desc" },
        select: { order: true },
      })
      skillOrder = (maxOrderSkill?.order || 0) + 1
    }

    const skill = await db.skill.create({
      data: {
        name,
        category,
        icon: icon || null,
        proficiency: proficiencyValue,
        order: skillOrder,
      },
    })

    return NextResponse.json({ skill }, { status: 201 })
  } catch (error) {
    console.error("Error creating skill:", error)
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    )
  }
}
