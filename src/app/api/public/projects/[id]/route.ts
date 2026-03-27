import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

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
    const parsedProject = {
      ...project,
      images: project.images ? JSON.parse(project.images) : [],
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
