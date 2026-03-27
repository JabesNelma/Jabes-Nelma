import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: [
        { category: 'asc' },
        { proficiency: 'desc' },
        { order: 'asc' },
      ],
      select: {
        id: true,
        name: true,
        category: true,
        icon: true,
        proficiency: true,
      },
    })

    // Group skills by category
    const groupedSkills = skills.reduce(
      (acc, skill) => {
        const category = skill.category
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(skill)
        return acc
      },
      {} as Record<string, typeof skills>
    )

    // Get top 3 skills per category
    const previewSkills = Object.entries(groupedSkills).map(
      ([category, categorySkills]) => ({
        category,
        skills: categorySkills.slice(0, 4),
        total: categorySkills.length,
      })
    )

    return NextResponse.json({
      success: true,
      data: previewSkills,
    })
  } catch (error) {
    console.error('Error fetching skills preview:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills preview' },
      { status: 500 }
    )
  }
}
