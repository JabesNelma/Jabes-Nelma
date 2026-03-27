import { NextResponse } from "next/server"
import { db } from "@/lib/db"

// Category order for display
const categoryOrder = ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"]

// GET /api/public/skills - List all skills grouped by category
export async function GET() {
  try {
    // Get all skills, sorted by order within each category
    const skills = await db.skill.findMany({
      orderBy: [
        { order: "asc" },
        { name: "asc" },
      ],
    })

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      const category = skill.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push({
        ...skill,
        icon: skill.icon || null,
      })
      return acc
    }, {} as Record<string, typeof skills>)

    // Sort categories by predefined order
    const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a)
      const indexB = categoryOrder.indexOf(b)
      // Put unknown categories at the end
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })

    const result = sortedCategories.map(category => ({
      category,
      skills: groupedSkills[category],
    }))

    return NextResponse.json({ categories: result })
  } catch (error) {
    console.error("Error fetching public skills:", error)
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    )
  }
}
