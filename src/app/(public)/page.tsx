'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

import { HeroSection } from '@/components/public/sections/hero-section'
import { FeaturedProjectsSection } from '@/components/public/sections/featured-projects-section'
import { SkillsPreviewSection } from '@/components/public/sections/skills-preview-section'
import { QuickAboutSection } from '@/components/public/sections/quick-about-section'

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  createdAt: string
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
  siteTitle?: string
  ownerName?: string
  ownerTitle?: string
  ownerBio?: string
  ownerLocation?: string
  ownerExperience?: string
  ownerEducation?: string
  ownerProfileImage?: string
  heroIntroduction?: string
}

export default function HomePage() {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [skills, setSkills] = React.useState<SkillCategory[]>([])
  const [siteConfig, setSiteConfig] = React.useState<SiteConfig>({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all data in parallel
        const [projectsRes, skillsRes, configRes] = await Promise.all([
          fetch('/api/public/featured-projects'),
          fetch('/api/public/skills-preview'),
          fetch('/api/public/site-config'),
        ])

        const projectsData = await projectsRes.json()
        const skillsData = await skillsRes.json()
        const configData = await configRes.json()

        if (projectsData.success) {
          setProjects(projectsData.data)
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

  // Extract skills for Quick About section
  const topSkills = skills
    .flatMap((cat) => cat.skills)
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 6)
    .map((s) => s.name)

  return (
    <>
      {loading ? (
        <div className="min-h-[90vh] flex items-center justify-center">
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
        <>
          <HeroSection
            name={siteConfig.ownerName}
            title={siteConfig.ownerTitle}
            introduction={siteConfig.heroIntroduction}
          />
          <FeaturedProjectsSection projects={projects} />
          <SkillsPreviewSection skills={skills} />
          <QuickAboutSection
            name={siteConfig.ownerName}
            title={siteConfig.ownerTitle}
            bio={siteConfig.ownerBio}
            location={siteConfig.ownerLocation}
            experience={siteConfig.ownerExperience}
            education={siteConfig.ownerEducation}
            profileImage={siteConfig.ownerProfileImage}
            skills={topSkills}
          />
        </>
      )}
    </>
  )
}
