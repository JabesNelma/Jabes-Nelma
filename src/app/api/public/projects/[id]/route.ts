import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

function parseImages(value: string | null): string[] {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    }
  } catch {
    // Ignore malformed JSON and fallback to empty list.
  }

  return []
}

// GET /api/public/projects/[id] - Get single published project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const project = await db.project.findFirst({
      where: {
        id,
        status: "published",
      },
    })

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    // Parse JSON fields
    const images = parseImages(project.images)
    const coverImage = project.coverImage || images[0] || null
    const normalizedImages = coverImage && !images.includes(coverImage)
      ? [coverImage, ...images]
      : images

    const parsedProject = {
      ...project,
      coverImage,
      images: normalizedImages,
      techStack: project.techStack ? JSON.parse(project.techStack) : [],
    }

    return NextResponse.json({ project: parsedProject })
  } catch (error) {
    console.error("Error fetching public project:", error)
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    )
  }
}
