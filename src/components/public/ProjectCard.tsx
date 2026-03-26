"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  projectUrl: string | null
  repoUrl: string | null
  type: string
  tags: string
  featured: boolean
  year?: number
  isPinned?: boolean
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const tags = JSON.parse(project.tags) as string[]

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm cursor-pointer">
        <Link href={`/projects/${project.id}`} className="block">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Badge
              variant={project.type === "client" ? "default" : "secondary"}
              className="absolute top-3 left-3 shadow-md"
            >
              {project.type === "client" ? "Client Work" : "Learning Project"}
            </Badge>
            {project.year && (
              <Badge
                variant="outline"
                className="absolute top-3 right-3 shadow-md bg-black/50 border-white/20 text-white"
              >
                {project.year}
              </Badge>
            )}
          </div>
        </Link>
        <CardContent className="p-4">
          <Link href={`/projects/${project.id}`} className="block">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Visit site</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">View code</span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
