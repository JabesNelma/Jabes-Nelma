"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getOptimizedImageUrl } from "@/lib/image-url"

interface Project {
  id: string
  title: string
  description: string
  coverImage: string | null
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  featured: boolean
}

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <Card
        role="link"
        tabIndex={0}
        onClick={() => router.push(`/projects/${project.id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            router.push(`/projects/${project.id}`)
          }
        }}
        className="group h-full cursor-pointer overflow-hidden border-border/70 bg-card"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {project.coverImage ? (
            <Image
              src={getOptimizedImageUrl(project.coverImage, 960, 78)}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white">
              View Details
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {project.featured && (
            <Badge className="absolute left-3 top-3">Featured</Badge>
          )}
        </div>

        <CardContent className="space-y-4 p-4">
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack?.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs font-normal">
                {tech}
              </Badge>
            ))}
            {project.techStack?.length > 4 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 border-t pt-3 text-muted-foreground">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-foreground"
                aria-label="Live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
