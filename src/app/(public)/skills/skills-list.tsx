"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Wrench } from "lucide-react"
import { SkillCard } from "@/components/public/skill-card"

interface Skill {
  id: string
  name: string
  category: string
  icon?: string | null
  proficiency: number
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

export function SkillsList() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch("/api/public/skills")
        if (!response.ok) throw new Error("Failed to fetch skills")
        const data = await response.json()
        setCategories(data.categories || [])
      } catch (err) {
        console.error("Error fetching skills:", err)
        setError("Failed to load skills")
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
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

  if (categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Wrench className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No Skills Yet
          </h2>
          <p className="text-muted-foreground">
            Skills will appear here once added.
          </p>
        </div>
      </div>
    )
  }

  // Category icons
  const categoryIcons: Record<string, string> = {
    Frontend: "🎨",
    Backend: "⚙️",
    Database: "🗄️",
    DevOps: "🚀",
    Tools: "🛠️",
    Other: "📦",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Skills & Technologies
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A comprehensive overview of my technical skills and the
              technologies I work with. Proficiency levels reflect my hands-on
              experience and depth of knowledge.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Skills by Category */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {categories.map((categoryData, categoryIndex) => (
            <motion.section
              key={categoryData.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">
                  {categoryIcons[categoryData.category] || "📦"}
                </span>
                <h2 className="text-2xl font-semibold text-foreground">
                  {categoryData.category}
                </h2>
                <span className="text-sm text-muted-foreground ml-2">
                  ({categoryData.skills.length} skills)
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryData.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    index={skillIndex}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  )
}
