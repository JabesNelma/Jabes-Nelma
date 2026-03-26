"use client"

import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface SkillCardProps {
  skill: {
    name: string
    category: string
    level: number
  }
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <motion.div 
      className="p-3 sm:p-4 rounded-lg bg-card/50 backdrop-blur-sm border hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-default"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-sm sm:text-base truncate">{skill.name}</h4>
          <p className="text-xs text-muted-foreground">{skill.category}</p>
        </div>
        <span className="text-xs sm:text-sm font-medium text-primary ml-2">{skill.level}/5</span>
      </div>
      <Progress value={skill.level * 20} className="h-1.5 sm:h-2" />
    </motion.div>
  )
}
