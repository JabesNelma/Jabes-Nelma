"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FolderOpen, Loader2 } from "lucide-react"
import { ProjectCard } from "@/components/public/project-card"

interface Project {
  id: string
  title: string
  description: string
  coverImage: string | null
  images: string[]
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  featured: boolean
}

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/public/projects")
        if (!response.ok) throw new Error("Failed to fetch projects")
        const data = await response.json()
        setProjects(data.projects || [])
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No Projects Yet
          </h2>
          <p className="text-muted-foreground">
            Projects will appear here once published.
          </p>
        </div>
      </div>
    )
  }

  // Separate featured and regular projects
  const featuredProjects = projects.filter((p) => p.featured)
  const regularProjects = projects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="layout-container py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Projects
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A collection of projects I&apos;ve worked on, from web applications
              to creative experiments. Each project represents a unique challenge
              and learning experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="layout-container py-16 md:py-20">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 text-center text-2xl font-semibold text-foreground"
            >
              Featured Work
            </motion.h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div>
          {featuredProjects.length > 0 && (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 text-center text-2xl font-semibold text-foreground"
            >
              Other Projects
            </motion.h2>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(featuredProjects.length > 0 ? regularProjects : projects).map(
              (project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
