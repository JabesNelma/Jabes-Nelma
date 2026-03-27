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
          <div className="container px-4 md:px-6 py-12">
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
              className="max-w-4xl mx-auto"
            >
              {/* Profile Header */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
              >
                {/* Profile Image */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-background shadow-xl"
                  >
                    <Image
                      src={siteConfig.ownerProfileImage || '/12.png'}
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
                    className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
                  >
                    {siteConfig.ownerName || 'Jabes Nelma'}
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-lg text-primary font-medium mb-4"
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
                <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                <div
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: siteConfig.ownerBio || 'Passionate developer with a love for creating beautiful, functional web applications.' }}
                />
              </motion.div>

              {/* Skills Section */}
              <motion.div variants={itemVariants} className="mb-16">
                <h2 className="text-2xl font-semibold mb-4" id="skills">Skills & Expertise</h2>
                {allSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className="px-3 py-1.5 text-sm"
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
                <h2 className="text-2xl font-semibold mb-8">Work Experience</h2>
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
