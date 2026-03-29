'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Download, Mail } from 'lucide-react'

import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { ExperienceTimeline } from '@/components/public/sections/experience-timeline'
import { SkillsPreviewSection } from '@/components/public/sections/skills-preview-section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getOptimizedImageUrl } from '@/lib/image-url'

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

interface SiteConfig {
  siteName?: string
  ownerName?: string
  ownerTitle?: string
  ownerBio?: string
  ownerLocation?: string
  ownerExperience?: string
  ownerEducation?: string
  ownerProfileImage?: string
  ownerResumeUrl?: string
  ownerEmail?: string
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function AboutPage() {
  const [experiences, setExperiences] = React.useState<Experience[]>([])
  const [skills, setSkills] = React.useState<SkillCategory[]>([])
  const [siteConfig, setSiteConfig] = React.useState<SiteConfig>({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [expRes, skillsRes, configRes] = await Promise.all([
          fetch('/api/public/experience'),
          fetch('/api/public/skills-preview'),
          fetch('/api/public/site-config'),
        ])

        const expData = await expRes.json()
        const skillsData = await skillsRes.json()
        const configData = await configRes.json()

        if (expData.success) {
          setExperiences(expData.data)
        }
        if (skillsData.success) {
          setSkills(skillsData.data)
        }
        if (configData.success) {
          setSiteConfig(configData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Extract all skills for display
  const allSkills = skills.flatMap((cat) => cat.skills)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {loading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </motion.div>
          </div>
        ) : (
          <div className="layout-container py-16 md:py-24 lg:py-28">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>

            {/* Profile Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto"
            >
              {/* Profile Header */}
              <motion.div
                variants={itemVariants}
                className="mb-14 flex flex-col items-center gap-8 rounded-2xl border border-border/70 bg-card/70 p-6 shadow-[0_20px_40px_-32px_rgba(15,23,42,0.5)] backdrop-blur md:flex-row md:items-start md:p-8"
              >
                {/* Profile Image */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="h-40 w-40 overflow-hidden rounded-2xl border-4 border-background shadow-xl md:h-48 md:w-48"
                  >
                    <Image
                      src={siteConfig.ownerProfileImage ? getOptimizedImageUrl(siteConfig.ownerProfileImage, 700, 82) : '/12.png'}
                      alt={siteConfig.ownerName || 'Profile'}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Profile Info */}
                <div className="text-center md:text-left flex-1">
                  <motion.h1
                    variants={itemVariants}
                    className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    {siteConfig.ownerName || 'Jabes Nelma'}
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="mb-4 text-lg font-medium text-sky-600 dark:text-sky-400"
                  >
                    {siteConfig.ownerTitle || 'Full Stack Developer'}
                  </motion.p>

                  {/* Quick Stats */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center md:justify-start gap-4 mb-6"
                  >
                    {siteConfig.ownerLocation && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{siteConfig.ownerLocation}</span>
                      </div>
                    )}
                    {siteConfig.ownerExperience && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span>{siteConfig.ownerExperience}</span>
                      </div>
                    )}
                    {siteConfig.ownerEducation && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span>{siteConfig.ownerEducation}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center md:justify-start gap-3"
                  >
                    {siteConfig.ownerResumeUrl && (
                      <Button asChild className="gap-2">
                        <a href={siteConfig.ownerResumeUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          Download Resume
                        </a>
                      </Button>
                    )}
                    <Button asChild variant="outline" className="gap-2">
                      <Link href="/contact">
                        <Mail className="h-4 w-4" />
                        Contact Me
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Bio Section */}
              <motion.div variants={itemVariants} className="mb-16">
                <h2 className="mb-4 text-center text-2xl font-semibold tracking-tight">About Me</h2>
                <div
                  className="prose prose-neutral max-w-none rounded-2xl border border-border/70 bg-card/60 p-6 text-muted-foreground shadow-[0_18px_40px_-34px_rgba(15,23,42,0.45)] dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: siteConfig.ownerBio || 'Passionate developer with a love for creating beautiful, functional web applications.' }}
                />
              </motion.div>

              {/* Skills Section */}
              <motion.div variants={itemVariants} className="mb-16">
                <h2 className="mb-4 text-center text-2xl font-semibold tracking-tight" id="skills">Skills & Expertise</h2>
                {allSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 rounded-2xl border border-border/70 bg-card/60 p-5">
                    {allSkills.map((skill) => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className="border border-border/70 bg-background/80 px-3 py-1.5 text-sm"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Skills coming soon!</p>
                )}
              </motion.div>

              <Separator className="my-12" />

              {/* Experience Section */}
              <motion.div variants={itemVariants}>
                <h2 className="mb-8 text-center text-2xl font-semibold">Work Experience</h2>
                <ExperienceTimeline experiences={experiences} />
              </motion.div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer siteName={siteConfig.siteName} />
    </div>
  )
}
