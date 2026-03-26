import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const project = await db.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await req.json()

    const project = await db.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        projectUrl: data.projectUrl,
        repoUrl: data.repoUrl,
        type: data.type,
        tags: data.tags,
        featured: data.featured,
        year: data.year,
        isPinned: data.isPinned,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await db.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await req.json()

    const updateData: Record<string, any> = {}
    if (data.isPinned !== undefined) updateData.isPinned = data.isPinned
    if (data.year !== undefined) updateData.year = data.year
    if (data.featured !== undefined) updateData.featured = data.featured

    const project = await db.project.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}
