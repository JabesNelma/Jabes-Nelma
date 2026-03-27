import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/admin/experience/[id] - Get single experience
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const experience = await db.experience.findUnique({
      where: { id },
    })

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ experience })
  } catch (error) {
    console.error("Error fetching experience:", error)
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/experience/[id] - Update experience
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      role,
      company,
      location,
      description,
      startDate,
      endDate,
      current,
      technologies,
      order,
    } = body

    // Check if experience exists
    const existingExperience = await db.experience.findUnique({
      where: { id },
    })

    if (!existingExperience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      )
    }

    // Update experience
    const experience = await db.experience.update({
      where: { id },
      data: {
        role: role || existingExperience.role,
        company: company || existingExperience.company,
        location: location !== undefined ? location || null : existingExperience.location,
        description: description || existingExperience.description,
        startDate: startDate ? new Date(startDate) : existingExperience.startDate,
        endDate: endDate ? new Date(endDate) : current ? null : existingExperience.endDate,
        current: current !== undefined ? current : existingExperience.current,
        technologies: technologies !== undefined ? technologies || null : existingExperience.technologies,
        order: order !== undefined ? order : existingExperience.order,
      },
    })

    return NextResponse.json({ experience })
  } catch (error) {
    console.error("Error updating experience:", error)
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/experience/[id] - Delete experience
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if experience exists
    const existingExperience = await db.experience.findUnique({
      where: { id },
    })

    if (!existingExperience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      )
    }

    // Delete experience
    await db.experience.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    )
  }
}
