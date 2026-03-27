"use client"

import { motion, useInView } from "framer-motion"
import { Building2, Calendar, MapPin, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRef } from "react"

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

interface ExperienceCardProps {
  experience: Experience
  index: number
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    x: index => index % 2 === 0 ? -50 : 50,
    y: 30
  },
  visible: { 
    opacity: 1, 
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  const dateRange = experience.current
    ? `${formatDate(experience.startDate)} - Present`
    : experience.endDate
    ? `${formatDate(experience.startDate)} - ${formatDate(experience.endDate)}`
    : formatDate(experience.startDate)

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline Dot */}
      <motion.div 
        className="absolute -left-[25px] top-6 w-3 h-3 rounded-full z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
      >
        {experience.current ? (
          <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/50">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping opacity-75" />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary to-purple-500 rounded-full shadow-md shadow-primary/30" />
        )}
      </motion.div>

      <Card
        className={`group relative overflow-hidden transition-all duration-500 hover:shadow-xl border-border/50 hover:border-primary/30 ${
          experience.current
            ? "bg-gradient-to-br from-emerald-500/5 via-card to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10"
            : "bg-gradient-to-br from-card via-card to-card/95"
        }`}
      >
        {/* Gradient Border Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg ${
          experience.current
            ? "bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20"
            : "bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10"
        }`} />
        
        {/* Current position glow */}
        {experience.current && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Current position indicator */}
        {experience.current && (
          <motion.div 
            className="absolute right-4 top-4 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg shadow-emerald-500/30">
              <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
              Current
            </Badge>
          </motion.div>
        )}

        <CardHeader className="pb-2 relative z-10">
          <div className="flex items-start gap-4">
            {/* Company Logo Placeholder */}
            <motion.div 
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                experience.current
                  ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
                  : "bg-gradient-to-br from-primary/10 to-purple-500/10"
              }`}
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <Building2 className={`h-7 w-7 ${
                experience.current
                  ? "text-emerald-500"
                  : "text-primary"
              }`} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl font-bold group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {experience.role}
              </CardTitle>
              <p className="text-primary font-semibold mt-1">{experience.company}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{dateRange}</span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-purple-500" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {experience.description}
          </p>

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {experience.technologies.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2 + i * 0.05 + index * 0.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs font-normal bg-gradient-to-r from-secondary/80 to-secondary hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
