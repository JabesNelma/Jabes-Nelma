import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

function parseImages(value: string | null): string[] {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    }
  } catch {
    // Ignore malformed JSON and fallback to empty list.
  }

  return []
}

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
        coverImage: true,
        images: true,
        techStack: true,
        githubUrl: true,
        liveUrl: true,
        createdAt: true,
        featured: true,
      },
    })

    // Parse JSON fields
    const formattedProjects = projects.map((project) => {
      const images = parseImages(project.images)
      const coverImage = project.coverImage || images[0] || null
      const normalizedImages = coverImage && !images.includes(coverImage)
        ? [coverImage, ...images]
        : images

      return {
        ...project,
        coverImage,
        images: normalizedImages,
        techStack: project.techStack ? JSON.parse(project.techStack) : [],
      }
    })

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
