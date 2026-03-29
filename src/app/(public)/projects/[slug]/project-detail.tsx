"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getOptimizedImageUrl } from "@/lib/image-url"

interface Project {
  id: string
  title: string
  description: string
  content?: string | null
  coverImage: string | null
  images: string[]
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
}

interface ProjectDetailProps {
  project: Project
  error?: string | null
}

const GALLERY_PAGE_SIZE = 8

export function ProjectDetail({ project, error }: ProjectDetailProps) {
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  const allImages = useMemo(() => {
    const normalized = project.images.filter((img) => typeof img === "string" && img.trim().length > 0)

    if (project.coverImage && !normalized.includes(project.coverImage)) {
      return [project.coverImage, ...normalized]
    }

    return normalized
  }, [project.coverImage, project.images])

  const coverImage = project.coverImage || allImages[0] || null
  const galleryImages = allImages.filter((img) => img !== coverImage)
  const visibleGallery = galleryImages.slice(0, visibleCount)

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-destructive">{error}</p>
          <Link href="/projects">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.description}
            </p>
          </div>

          {coverImage && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border/70 bg-muted">
              <Image
                src={getOptimizedImageUrl(coverImage, 1600, 80)}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="space-y-5"
        >
          <h2 className="text-xl font-semibold">Gallery</h2>

          {galleryImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleGallery.map((image, index) => {
                  const realIndex = allImages.indexOf(image)

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(realIndex)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-muted text-left"
                    >
                      <Image
                        src={getOptimizedImageUrl(image, 900, 78)}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </button>
                  )
                })}
              </div>

              {visibleCount < galleryImages.length && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((current) => current + GALLERY_PAGE_SIZE)}
                  >
                    Load More Images
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Belum ada gambar gallery tambahan.</p>
          )}
        </motion.section>

        <Separator />

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="grid gap-10 lg:grid-cols-[2fr_1fr]"
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Project Story</h2>
            {project.content ? (
              <div className="prose prose-neutral max-w-none dark:prose-invert">
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted-foreground">Detail narasi project belum ditambahkan.</p>
            )}
          </div>

          <aside className="space-y-6 rounded-xl border border-border/70 p-5">
            {project.techStack?.length > 0 && (
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Code2 className="h-4 w-4" />
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(project.githubUrl || project.liveUrl) && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Links</div>
                <div className="flex flex-col gap-2">
                  {project.liveUrl && (
                    <Button asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </aside>
        </motion.section>
      </div>

      {activeImageIndex !== null && allImages[activeImageIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute right-4 top-4 rounded-full border border-white/30 p-2 text-white transition-colors hover:bg-white/10"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveImageIndex((current) => {
                    if (current === null) return null
                    return current === 0 ? allImages.length - 1 : current - 1
                  })
                }
                className="absolute left-4 rounded-full border border-white/30 p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveImageIndex((current) => {
                    if (current === null) return null
                    return current === allImages.length - 1 ? 0 : current + 1
                  })
                }
                className="absolute right-4 rounded-full border border-white/30 p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-xl">
            <Image
              src={getOptimizedImageUrl(allImages[activeImageIndex], 1800, 82)}
              alt={`${project.title} lightbox ${activeImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
