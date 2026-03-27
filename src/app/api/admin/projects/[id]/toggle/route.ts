import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// PATCH /api/admin/projects/[id]/toggle - Toggle featured/status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { field } = body // 'featured' or 'status'

    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    let updateData: { featured?: boolean; status?: string } = {}

    if (field === "featured") {
      updateData = { featured: !existingProject.featured }
    } else if (field === "status") {
      updateData = { status: existingProject.status === "draft" ? "published" : "draft" }
    } else {
      return NextResponse.json({ error: "Invalid field to toggle" }, { status: 400 })
    }

    const project = await db.project.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Error toggling project:", error)
    return NextResponse.json(
      { error: "Failed to toggle project" },
      { status: 500 }
    )
  }
}
