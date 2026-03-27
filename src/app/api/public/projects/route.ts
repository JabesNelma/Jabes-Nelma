import { NextResponse } from "next/server"
import { db } from "@/lib/db"

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
    const parsedProjects = projects.map(project => ({
      ...project,
      images: project.images ? JSON.parse(project.images) : [],
      techStack: project.techStack ? JSON.parse(project.techStack) : [],
    }))

    return NextResponse.json({ projects: parsedProjects })
  } catch (error) {
    console.error("Error fetching public projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}
