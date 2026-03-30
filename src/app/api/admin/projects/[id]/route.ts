import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"

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

  const deduped = new Set<string>()

  for (const image of images) {
    if (typeof image !== "string") {
      continue
    }

    const normalized = image.trim()
    if (!normalized) {
      continue
    }

    deduped.add(normalized)
  }

  return Array.from(deduped)
}

function normalizeTechStack(value: unknown): string[] | null {
  if (!Array.isArray(value)) {
    return null
  }

  const deduped = new Set<string>()
  for (const item of value) {
    if (typeof item !== "string") {
      continue
    }

    const normalized = item.trim()
    if (!normalized) {
      continue
    }

    deduped.add(normalized)
  }

  return Array.from(deduped)
}

function getPrismaErrorPayload(error: unknown): { error: string; details?: string } {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2000") {
      return {
        error: "Data terlalu panjang untuk disimpan",
        details: "Periksa panjang konten, URL gambar, atau field teks lainnya.",
      }
    }

    if (error.code === "P2022") {
      return {
        error: "Skema database belum sinkron",
        details: "Ada kolom yang belum tersedia di database deployment. Jalankan migrasi terbaru.",
      }
    }

    return {
      error: "Prisma request error",
      details: `${error.code}: ${error.message}`,
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      error: "Validasi data gagal di server",
      details: error.message,
    }
  }

  if (error instanceof Error) {
    return {
      error: "Failed to update project",
      details: error.message,
    }
  }

  return { error: "Failed to update project" }
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
    const normalizedTechStack = normalizeTechStack(techStack)

    const fallbackCover = existingProject.coverImage || existingImages[0] || ""
    const normalizedCover = typeof coverImage === "string" ? coverImage.trim() : fallbackCover
    const normalizedTitle = typeof title === "string" ? title.trim() : existingProject.title
    const normalizedDescription =
      typeof description === "string" ? description.trim() : existingProject.description
    const normalizedGithubUrl = typeof githubUrl === "string" ? githubUrl.trim() : existingProject.githubUrl
    const normalizedLiveUrl = typeof liveUrl === "string" ? liveUrl.trim() : existingProject.liveUrl
    const normalizedStatus = status === "draft" || status === "published"
      ? status
      : existingProject.status
    const normalizedFeatured = typeof featured === "boolean" ? featured : existingProject.featured
    const normalizedOrder = typeof order === "number" && Number.isFinite(order)
      ? order
      : existingProject.order

    if (!normalizedTitle || !normalizedDescription) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }

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
        title: normalizedTitle,
        description: normalizedDescription,
        content: content || null,
        coverImage: normalizedCover,
        images: JSON.stringify(finalImages),
        techStack: normalizedTechStack ? JSON.stringify(normalizedTechStack) : null,
        githubUrl: normalizedGithubUrl || null,
        liveUrl: normalizedLiveUrl || null,
        featured: normalizedFeatured,
        status: normalizedStatus,
        order: normalizedOrder,
      },
    })

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Error updating project:", error)
    const errorPayload = getPrismaErrorPayload(error)
    return NextResponse.json(
      errorPayload,
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
