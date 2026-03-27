'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Database as DatabaseIcon, Globe, Wrench, Cpu, Layers, Server } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
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
    bg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20', 
    text: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/20'
  },
  Backend: { 
    bg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20', 
    text: 'text-emerald-600 dark:text-emerald-400',
    gradient: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/20'
  },
  Database: { 
    bg: 'bg-gradient-to-br from-purple-500/20 to-violet-500/20', 
    text: 'text-purple-600 dark:text-purple-400',
    gradient: 'from-purple-500 to-violet-500',
    border: 'border-purple-500/20'
  },
  DevOps: { 
    bg: 'bg-gradient-to-br from-orange-500/20 to-amber-500/20', 
    text: 'text-orange-600 dark:text-orange-400',
    gradient: 'from-orange-500 to-amber-500',
    border: 'border-orange-500/20'
  },
  Tools: { 
    bg: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20', 
    text: 'text-pink-600 dark:text-pink-400',
    gradient: 'from-pink-500 to-rose-500',
    border: 'border-pink-500/20'
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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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

function SkillItem({ skill, index, gradient }: { skill: Skill; index: number; gradient: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="space-y-2 group"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium group-hover:text-primary transition-colors">{skill.name}</span>
        <span className="text-xs text-muted-foreground font-mono">{skill.proficiency}%</span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden relative">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} relative overflow-hidden`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
        >
          {/* Shimmer Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
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
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <div className="h-full p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden group">
        {/* Gradient Border Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Corner Decoration */}
        <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${style.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <motion.div 
            className={cn('p-3 rounded-xl', style.bg)}
            whileHover={{ rotate: 10, scale: 1.1 }}
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

        {/* Skills List */}
        <div className="space-y-4 relative z-10">
          {categoryData.skills.map((skill, i) => (
            <SkillItem key={skill.id} skill={skill} index={i} gradient={style.gradient} />
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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-muted/50 via-transparent to-muted/30" />
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 bottom-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 text-sm font-medium mb-4"
          >
            💻 Tech Stack
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
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
                className="group border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:via-purple-500/10 hover:to-pink-500/10 transition-all duration-300 hover:scale-105"
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
              <Layers className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Skills coming soon!</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
