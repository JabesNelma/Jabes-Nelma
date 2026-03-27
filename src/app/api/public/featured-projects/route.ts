import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Get published projects: featured first, then recent ones
    const projects = await db.project.findMany({
      where: {
        status: 'published',
      },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
      take: 6,
      select: {
        id: true,
        title: true,
        description: true,
        images: true,
        techStack: true,
        githubUrl: true,
        liveUrl: true,
        createdAt: true,
        featured: true,
      },
    })

    // Parse JSON fields
    const formattedProjects = projects.map((project) => ({
      ...project,
      images: project.images ? JSON.parse(project.images) : [],
      techStack: project.techStack ? JSON.parse(project.techStack) : [],
    }))

    return NextResponse.json({
      success: true,
      data: formattedProjects,
    })
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured projects' },
      { status: 500 }
    )
  }
}
