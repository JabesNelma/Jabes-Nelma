"use client"

import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useRef } from "react"

interface Skill {
  id: string
  name: string
  category: string
  icon?: string | null
  proficiency: number
}

interface SkillCardProps {
  skill: Skill
  index?: number
}

// Category gradient colors
const categoryGradients: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  Frontend: { 
    bg: "bg-emerald-500/10", 
    text: "text-emerald-600 dark:text-emerald-400", 
    border: "border-emerald-500/20",
    gradient: "from-emerald-500 to-teal-500"
  },
  Backend: { 
    bg: "bg-violet-500/10", 
    text: "text-violet-600 dark:text-violet-400", 
    border: "border-violet-500/20",
    gradient: "from-violet-500 to-purple-500"
  },
  Database: { 
    bg: "bg-orange-500/10", 
    text: "text-orange-600 dark:text-orange-400", 
    border: "border-orange-500/20",
    gradient: "from-orange-500 to-amber-500"
  },
  DevOps: { 
    bg: "bg-sky-500/10", 
    text: "text-sky-600 dark:text-sky-400", 
    border: "border-sky-500/20",
    gradient: "from-sky-500 to-blue-500"
  },
  Tools: { 
    bg: "bg-rose-500/10", 
    text: "text-rose-600 dark:text-rose-400", 
    border: "border-rose-500/20",
    gradient: "from-rose-500 to-pink-500"
  },
  Other: { 
    bg: "bg-slate-500/10", 
    text: "text-slate-600 dark:text-slate-400", 
    border: "border-slate-500/20",
    gradient: "from-slate-500 to-gray-500"
  },
}

// Progress bar gradient based on proficiency
const getProgressGradient = (proficiency: number) => {
  if (proficiency >= 80) return "from-emerald-500 via-teal-500 to-cyan-500"
  if (proficiency >= 60) return "from-sky-500 via-blue-500 to-indigo-500"
  if (proficiency >= 40) return "from-amber-500 via-orange-500 to-yellow-500"
  return "from-slate-400 via-gray-400 to-slate-500"
}

// Proficiency labels with colors
const getProficiencyInfo = (proficiency: number) => {
  if (proficiency >= 90) return { label: "Expert", color: "text-emerald-500" }
  if (proficiency >= 70) return { label: "Advanced", color: "text-sky-500" }
  if (proficiency >= 50) return { label: "Intermediate", color: "text-amber-500" }
  if (proficiency >= 30) return { label: "Beginner", color: "text-orange-500" }
  return { label: "Novice", color: "text-slate-400" }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const categoryStyle = categoryGradients[skill.category] || categoryGradients.Other
  const proficiencyInfo = getProficiencyInfo(skill.proficiency)

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.05 }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`} />
      
      <div className="relative p-5 rounded-xl border border-border/50 hover:border-primary/30 bg-gradient-to-br from-card via-card/95 to-card/90 hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Decorative Corner Gradient */}
        <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${categoryStyle.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-500`} />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <motion.div 
                className={`w-10 h-10 rounded-lg ${categoryStyle.bg} flex items-center justify-center relative overflow-hidden`}
                whileHover={{ rotate: 5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                {skill.icon ? (
                  <span className="text-lg relative z-10">{skill.icon}</span>
                ) : (
                  <span className={`text-sm font-bold relative z-10 ${categoryStyle.text}`}>
                    {skill.name.charAt(0)}
                  </span>
                )}
              </motion.div>

              {/* Name */}
              <h3 className="font-semibold text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {skill.name}
              </h3>
            </div>

            {/* Proficiency percentage */}
            <motion.span 
              className="text-sm font-bold text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              {skill.proficiency}%
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden relative">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${getProgressGradient(skill.proficiency)} relative overflow-hidden`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: "easeOut" }}
              >
                {/* Shimmer Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Footer with category and level */}
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={`${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} text-xs font-medium border transition-all duration-300 group-hover:scale-105`}
            >
              {skill.category}
            </Badge>
            <motion.span 
              className={`text-xs font-medium ${proficiencyInfo.color}`}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              {proficiencyInfo.label}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
