'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Experience {
  id: string
  role: string
  company: string
  location?: string | null
  description: string
  startDate: string
  endDate?: string | null
  current: boolean
  technologies: string[]
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'relative flex items-center gap-4 md:gap-8',
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
          className={cn(
            'w-4 h-4 rounded-full border-4 border-background',
            experience.current
              ? 'bg-green-500 shadow-lg shadow-green-500/30'
              : 'bg-primary'
          )}
        />
      </div>

      {/* Content Card */}
      <div
        className={cn(
          'ml-8 md:ml-0 md:w-[calc(50%-2rem)] p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors',
          isLeft ? 'md:text-right' : 'md:text-left'
        )}
      >
        {/* Date Badge */}
        <div
          className={cn(
            'flex items-center gap-2 text-sm text-muted-foreground mb-2',
            isLeft ? 'md:justify-end' : 'md:justify-start'
          )}
        >
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(experience.startDate)} -{' '}
            {experience.current ? 'Present' : experience.endDate ? formatDate(experience.endDate) : 'N/A'}
          </span>
          {experience.current && (
            <Badge variant="default" className="ml-2 bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
              Current
            </Badge>
          )}
        </div>

        {/* Role & Company */}
        <h3 className="text-xl font-semibold mb-1">{experience.role}</h3>
        <div
          className={cn(
            'flex items-center gap-4 text-muted-foreground mb-3',
            isLeft ? 'md:justify-end' : 'md:justify-start'
          )}
        >
          <span className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            {experience.company}
          </span>
          {experience.location && (
            <span className="flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3" />
              {experience.location}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {experience.description}
        </p>

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div
            className={cn(
              'flex flex-wrap gap-1.5',
              isLeft ? 'md:justify-end' : 'md:justify-start'
            )}
          >
            {experience.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section className="py-12">
      {experiences.length > 0 ? (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No experience entries yet.
        </div>
      )}
    </section>
  )
}
