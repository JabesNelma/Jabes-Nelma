"use client"

import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, Sparkles } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  featured: boolean
}

interface ProjectCardProps {
  project: Project
  index?: number
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0.1,
    },
  },
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const coverImage = project.images?.[0] || null
  const ref = useRef(null)
  const router = useRouter()
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const openProject = () => {
    router.push(`/projects/${project.id}`)
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      className="h-full"
    >
      <Card
        role="link"
        tabIndex={0}
        onClick={openProject}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            openProject()
          }
        }}
        className="h-full overflow-hidden group cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-card via-card to-card/95 hover:shadow-xl hover:shadow-primary/10 relative"
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        <div className="absolute inset-[1px] bg-card rounded-lg" />

        {/* Card Content Wrapper */}
        <div className="relative z-10">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden bg-muted">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
                <span className="text-6xl font-bold bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/30 bg-clip-text text-transparent">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                className="absolute top-3 right-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg shadow-amber-500/30">
                  <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                  Featured
                </Badge>
              </motion.div>
            )}

            {/* Hover Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quick Action Buttons on Hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
            >
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Content */}
          <CardContent className="p-5">
            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack?.slice(0, 4).map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs font-normal bg-gradient-to-r from-secondary to-secondary/80 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
              {project.techStack?.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs font-normal border-dashed"
                >
                  +{project.techStack.length - 4}
                </Badge>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-3 border-t border-border/50">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
              <motion.div
                className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                Click to view →
              </motion.div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
