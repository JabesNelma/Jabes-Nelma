"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Loader2 } from "lucide-react"
import { ExperienceCard } from "@/components/public/experience-card"

interface Experience {
  id: string
  role: string
  company: string
  location: string | null
  description: string
  startDate: string
  endDate: string | null
  current: boolean
  technologies: string[]
}

export function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch("/api/public/experience")
        if (!response.ok) {
          throw new Error("Failed to fetch experiences")
        }
        const data = await response.json()
        setExperiences(data.experiences || [])
      } catch (err) {
        console.error("Error fetching experiences:", err)
        setError("Failed to load experiences. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">No experience yet</h3>
        <p className="text-muted-foreground">
          Work experience entries will appear here once added.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2" />

      {/* Timeline entries */}
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-start gap-4 md:gap-8 ${
              index % 2 === 0
                ? "md:flex-row"
                : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />

            {/* Content */}
            <div className="ml-12 md:ml-0 md:w-[calc(50%-2rem)]">
              <ExperienceCard experience={experience} index={index} />
            </div>

            {/* Empty space for alternating layout on desktop */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
