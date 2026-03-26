import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projects = await db.project.findMany({
      orderBy: [{ isPinned: "desc" }, { year: "desc" }, { createdAt: "desc" }],
    })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const project = await db.project.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        projectUrl: data.projectUrl,
        repoUrl: data.repoUrl,
        type: data.type,
        tags: data.tags,
        featured: data.featured,
        year: data.year || 2026,
        isPinned: data.isPinned || false,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
