import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/admin/skills/[id] - Get single skill
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const skill = await db.skill.findUnique({
      where: { id },
    })

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    return NextResponse.json({ skill })
  } catch (error) {
    console.error("Error fetching skill:", error)
    return NextResponse.json(
      { error: "Failed to fetch skill" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/skills/[id] - Update skill
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, category, icon, proficiency, order } = body

    // Check if skill exists
    const existingSkill = await db.skill.findUnique({
      where: { id },
    })

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    // Validate category if provided
    if (category) {
      const validCategories = ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"]
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: "Invalid category. Must be one of: " + validCategories.join(", ") },
          { status: 400 }
        )
      }
    }

    // Validate proficiency if provided
    if (proficiency !== undefined && (proficiency < 0 || proficiency > 100)) {
      return NextResponse.json(
        { error: "Proficiency must be between 0 and 100" },
        { status: 400 }
      )
    }

    // Update skill
    const skill = await db.skill.update({
      where: { id },
      data: {
        name: name ?? existingSkill.name,
        category: category ?? existingSkill.category,
        icon: icon !== undefined ? icon : existingSkill.icon,
        proficiency: proficiency ?? existingSkill.proficiency,
        order: order ?? existingSkill.order,
      },
    })

    return NextResponse.json({ skill })
  } catch (error) {
    console.error("Error updating skill:", error)
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/skills/[id] - Delete skill
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if skill exists
    const existingSkill = await db.skill.findUnique({
      where: { id },
    })

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    // Delete skill
    await db.skill.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: "Skill deleted successfully" })
  } catch (error) {
    console.error("Error deleting skill:", error)
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    )
  }
}
