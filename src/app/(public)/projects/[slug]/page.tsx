import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProjectDetail } from "./project-detail"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/public/projects/${slug}`,
      { cache: "no-store" }
    )

    if (!response.ok) return { title: "Project Not Found" }

    const data = await response.json()
    const project = data.project

    return {
      title: `${project.title} | Portfolio`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.coverImage ? [project.coverImage] : project.images?.[0] ? [project.images[0]] : [],
      },
    }
  } catch {
    return { title: "Project | Portfolio" }
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch project data server-side
  let project = null
  let error = null

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/public/projects/${slug}`,
      { cache: "no-store" }
    )

    if (response.ok) {
      const data = await response.json()
      project = data.project
    } else if (response.status === 404) {
      notFound()
    } else {
      error = "Failed to load project"
    }
  } catch (err) {
    console.error("Error fetching project:", err)
    error = "Failed to load project"
  }

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} error={error} />
}
