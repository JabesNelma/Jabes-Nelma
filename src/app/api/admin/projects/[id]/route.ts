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

function normalizeImages(images: unknown): string[] {
  if (!Array.isArray(images)) {
    return []
  }

  return images.filter((image): image is string => typeof image === "string" && image.trim().length > 0)
}

// GET /api/admin/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const project = await db.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const parsedImages = parseImages(project.images)
    const coverImage = project.coverImage || parsedImages[0] || null
    const images = coverImage && !parsedImages.includes(coverImage)
      ? [coverImage, ...parsedImages]
      : parsedImages

    return NextResponse.json({
      project: {
        ...project,
        coverImage,
        images: JSON.stringify(images),
      },
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/projects/[id] - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      title,
      description,
      content,
      images,
      coverImage,
      techStack,
      githubUrl,
      liveUrl,
      featured,
      status,
      order,
    } = body

    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const existingImages = parseImages(existingProject.images)
    const normalizedImages = normalizeImages(images)

    const fallbackCover = existingProject.coverImage || existingImages[0] || ""
    const normalizedCover = typeof coverImage === "string" ? coverImage.trim() : fallbackCover

    if (!normalizedCover) {
      return NextResponse.json({ error: "Cover image is required" }, { status: 400 })
    }

    const baseImages = normalizedImages.length > 0 ? normalizedImages : existingImages
    const finalImages = baseImages.includes(normalizedCover)
      ? baseImages
      : [normalizedCover, ...baseImages]

    // Update project
    const project = await db.project.update({
      where: { id },
      data: {
        title,
        description,
        content: content || null,
        coverImage: normalizedCover,
        images: JSON.stringify(finalImages),
        techStack: techStack ? JSON.stringify(techStack) : null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        featured: featured ?? existingProject.featured,
        status: status || existingProject.status,
        order: order ?? existingProject.order,
      },
    })

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Delete project
    await db.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
