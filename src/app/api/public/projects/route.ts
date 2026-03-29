import { NextResponse } from "next/server"
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

// GET /api/public/projects - List all published projects
export async function GET() {
  try {
    // Get only published projects, sorted by featured first, then by date
    const projects = await db.project.findMany({
      where: {
        status: "published",
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    })

    // Parse JSON fields for each project
    const parsedProjects = projects.map((project) => {
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

    return NextResponse.json({ projects: parsedProjects })
  } catch (error) {
    console.error("Error fetching public projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}
