'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Folder } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/public/project-card'
import { useRef } from 'react'

interface Project {
  id: string
  title: string
  description: string
  coverImage: string | null
  images: string[]
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  createdAt: string
}

interface FeaturedProjectsSectionProps {
  projects: Project[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-shell relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,0.1),transparent_40%)]" />
        <motion.div
          animate={{ x: [0, 24, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-44 top-6 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -24, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-16 -right-44 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl"
        />
      </div>

      <div className="layout-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-sky-600/80">Featured Work</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 text-pretty text-muted-foreground sm:text-lg">
            A curated selection of recent products with measurable outcomes, thoughtful UX decisions, and strong engineering execution.
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.slice(0, 3).map((project, index) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-border/70 bg-background/70 transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-500/5"
              >
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10">
              <Folder className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No featured projects yet. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
