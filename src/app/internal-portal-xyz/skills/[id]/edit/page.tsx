"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Pencil, Loader2, ArrowLeft } from "lucide-react"

import { SkillForm } from "@/components/admin/skills/skill-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Skill {
  id: string
  name: string
  category: string
  icon: string | null
  proficiency: number
  order: number
  createdAt: string
  updatedAt: string
}

export default function EditSkillPage() {
  const params = useParams()
  const router = useRouter()
  const skillId = params.id as string

  const [skill, setSkill] = React.useState<Skill | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`/api/admin/skills/${skillId}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch skill")
        }

        setSkill(data.skill)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load skill")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkill()
  }, [skillId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Loading skill...</span>
        </div>
      </div>
    )
  }

  if (error || !skill) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive mb-4">
              {error || "Skill not found"}
            </p>
            <Button onClick={() => router.push("/internal-portal-xyz/skills")}>
              Go to Skills
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Pencil className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Skill</h1>
            <p className="text-muted-foreground">
              Update details for {skill.name}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Skill Details</CardTitle>
            <CardDescription>
              Modify the skill information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SkillForm skill={skill} isEditing />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
