"use client"

import * as React from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { FolderKanban, Wrench, Mail, FileText, TrendingUp, TrendingDown } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: number
  description?: string
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
  }
  index?: number
}

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 50, damping: 20 })
  const display = useTransform(spring, (current) => Math.round(current))

  React.useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span>{display}</motion.span>
}

function StatCard({ title, value, description, icon: Icon, trend, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tabular-nums">
            <AnimatedCounter value={value} />
          </div>
          {(description || trend) && (
            <div className="mt-2 flex items-center gap-2 text-sm">
              {trend && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 font-medium",
                    trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}
                >
                  {trend.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {trend.value}%
                </span>
              )}
              {description && (
                <span className="text-muted-foreground">{description}</span>
              )}
            </div>
          )}
        </CardContent>
        {/* Background decoration */}
        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent" />
      </Card>
    </motion.div>
  )
}

interface StatsCardsProps {
  stats?: {
    projects: number
    skills: number
    messages: number
    blogPosts: number
  }
}

const defaultStats = {
  projects: 12,
  skills: 24,
  messages: 8,
  blogPosts: 6,
}

export function StatsCards({ stats = defaultStats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      description: "from last month",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: Wrench,
      description: "across 5 categories",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: Mail,
      description: "3 unread",
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      description: "published",
      trend: { value: 3, isPositive: true },
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <StatCard key={card.title} {...card} index={index} />
      ))}
    </div>
  )
}
