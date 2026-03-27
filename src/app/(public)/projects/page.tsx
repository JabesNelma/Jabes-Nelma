import { Metadata } from "next"
import { ProjectsList } from "./projects-list"

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "Explore my latest projects and creative works",
}

export default function ProjectsPage() {
  return <ProjectsList />
}
