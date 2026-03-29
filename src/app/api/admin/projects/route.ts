import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

function normalizeImages(images: unknown): string[] {
  if (!Array.isArray(images)) {
    return []
  }

  return images.filter((image): image is string => typeof image === "string" && image.trim().length > 0)
}

// GET /api/admin/projects - List all projects with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const featured = searchParams.get("featured")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "10", 10)

    // Build where clause
    const where: {
      title?: { contains: string; mode: "insensitive" }
      status?: string
      featured?: boolean
    } = {}

    if (search) {
      where.title = { contains: search, mode: "insensitive" }
    }

    if (status && (status === "draft" || status === "published")) {
      where.status = status
    }

    if (featured !== null && featured !== "") {
      where.featured = featured === "true"
    }

    // Get total count
    const total = await db.project.count({ where })

    // Get projects
    const projects = await db.project.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

// POST /api/admin/projects - Create new project
export async function POST(request: NextRequest) {
  try {
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
    } = body

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }

    const normalizedImages = normalizeImages(images)
    const normalizedCover = typeof coverImage === "string" ? coverImage.trim() : ""

    if (!normalizedCover) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      )
    }

    const finalImages = normalizedImages.includes(normalizedCover)
      ? normalizedImages
      : [normalizedCover, ...normalizedImages]

    // Get the max order for new project
    const maxOrderProject = await db.project.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })
    const order = (maxOrderProject?.order || 0) + 1

    const project = await db.project.create({
      data: {
        title,
        description,
        content: content || null,
        coverImage: normalizedCover,
        images: JSON.stringify(finalImages),
        techStack: techStack ? JSON.stringify(techStack) : null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        featured: featured || false,
        status: status || "draft",
        order,
      },
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
