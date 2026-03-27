"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Briefcase, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ExperienceForm } from "@/components/admin/experience/experience-form"

interface Experience {
  id: string
  role: string
  company: string
  location: string | null
  description: string
  startDate: string
  endDate: string | null
  current: boolean
  technologies: string | null
  order: number
}

export default function EditExperiencePage() {
  const params = useParams()
  const id = params.id as string
  const [experience, setExperience] = React.useState<Experience | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`/api/admin/experience/${id}`)
        if (!response.ok) throw new Error("Failed to fetch experience")
        const data = await response.json()
        setExperience(data.experience)
      } catch {
        toast.error("Failed to load experience")
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperience()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Experience not found</p>
          <Button variant="outline" asChild className="mt-4">
            <Link href="/internal-portal-xyz/experience">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
          <p className="text-muted-foreground">
            Update {experience.role} at {experience.company}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/internal-portal-xyz/experience">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
      </motion.div>

      {/* Experience Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ExperienceForm experience={experience} isEdit />
      </motion.div>
    </div>
  )
}
