import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const experiences = await db.experience.findMany({
      orderBy: [
        { current: 'desc' },
        { startDate: 'desc' },
        { order: 'desc' },
      ],
      select: {
        id: true,
        role: true,
        company: true,
        location: true,
        description: true,
        startDate: true,
        endDate: true,
        current: true,
        technologies: true,
      },
    })

    // Parse JSON fields
    const formattedExperiences = experiences.map((exp) => ({
      ...exp,
      technologies: exp.technologies ? JSON.parse(exp.technologies) : [],
    }))

    return NextResponse.json({
      success: true,
      data: formattedExperiences,
    })
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experiences' },
      { status: 500 }
    )
  }
}
