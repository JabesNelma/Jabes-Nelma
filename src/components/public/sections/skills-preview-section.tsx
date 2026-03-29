'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Database as DatabaseIcon, Globe, Wrench, Cpu, Layers, Server } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

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
  total: number
}

interface SkillsPreviewSectionProps {
  skills: SkillCategory[]
}

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Globe,
  Backend: Server,
  Database: DatabaseIcon,
  DevOps: Cpu,
  Tools: Wrench,
  Other: Layers,
}

const categoryStyles: Record<string, { bg: string; text: string; gradient: string; border: string }> = {
  Frontend: { 
    bg: 'bg-blue-500/10', 
    text: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-500 to-cyan-400',
    border: 'border-blue-500/20'
  },
  Backend: { 
    bg: 'bg-emerald-500/10', 
    text: 'text-emerald-600 dark:text-emerald-400',
    gradient: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/20'
  },
  Database: { 
    bg: 'bg-amber-500/10', 
    text: 'text-amber-600 dark:text-amber-400',
    gradient: 'from-amber-500 to-orange-500',
    border: 'border-amber-500/20'
  },
  DevOps: { 
    bg: 'bg-sky-500/10', 
    text: 'text-sky-600 dark:text-sky-400',
    gradient: 'from-sky-500 to-indigo-500',
    border: 'border-sky-500/20'
  },
  Tools: { 
    bg: 'bg-teal-500/10', 
    text: 'text-teal-600 dark:text-teal-400',
    gradient: 'from-teal-500 to-cyan-500',
    border: 'border-teal-500/20'
  },
  Other: { 
    bg: 'bg-gradient-to-br from-slate-500/20 to-gray-500/20', 
    text: 'text-slate-600 dark:text-slate-400',
    gradient: 'from-slate-500 to-gray-500',
    border: 'border-slate-500/20'
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

function CategoryCard({ categoryData, index }: { categoryData: SkillCategory; index: number }) {
  const IconComponent = categoryIcons[categoryData.category] || Layers
  const style = categoryStyles[categoryData.category] || categoryStyles.Other
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-6 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.4)] transition-all duration-300 hover:border-sky-500/30 hover:shadow-[0_20px_38px_-28px_rgba(14,165,233,0.38)]">
        <div className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${style.gradient} opacity-15 blur-2xl`} />

        <div className="relative z-10 mb-5 flex items-center gap-3">
          <motion.div 
            className={cn('p-3 rounded-xl', style.bg)}
            whileHover={{ rotate: 6, scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <IconComponent className={cn('h-5 w-5', style.text)} />
          </motion.div>
          <div>
            <h3 className="font-semibold group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {categoryData.category}
            </h3>
            <p className="text-xs text-muted-foreground">
              {categoryData.total} skill{categoryData.total !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2">
          {categoryData.skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.08 + i * 0.04, duration: 0.25 }}
            >
              <Badge
                variant="secondary"
                className="cursor-default border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-foreground/85 transition-colors group-hover:border-sky-500/25"
              >
                {skill.name}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsPreviewSection({ skills }: SkillsPreviewSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="section-shell relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.1),transparent_42%),radial-gradient(circle_at_15%_75%,rgba(14,165,233,0.1),transparent_40%)]" />
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -24, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-sky-600/80">Capabilities</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Organized by domain to show where I build most of my product and engineering impact.
          </p>
        </motion.div>

        {skills.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {skills.slice(0, 6).map((categoryData, index) => (
                <CategoryCard key={categoryData.category} categoryData={categoryData} index={index} />
              ))}
            </motion.div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="group border-border/70 bg-background/70 transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-500/5"
              >
                <Link href="/about#skills">
                  View All Skills
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-500/10 flex items-center justify-center">
              <Layers className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Skills coming soon!</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
