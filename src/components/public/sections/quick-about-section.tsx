'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MapPin, Briefcase, GraduationCap, Code2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRef } from 'react'
import { getOptimizedImageUrl } from '@/lib/image-url'

interface QuickAboutSectionProps {
  name?: string
  title?: string
  bio?: string
  location?: string
  experience?: string
  education?: string
  profileImage?: string
  skills?: string[]
}

const defaultProps: QuickAboutSectionProps = {
  name: 'Jabes Nelma',
  title: 'Full Stack Developer',
  bio: 'I&apos;m a passionate developer with 5+ years of experience building web applications. I love turning complex problems into simple, beautiful, and intuitive solutions. When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.',
  location: 'Dili, East-Timor',
  experience: '5+ Years',
  education: 'CS Degree',
  profileImage: '/12.png',
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'],
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
  hidden: { opacity: 0, y: 30 },
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

export function QuickAboutSection({
  name = defaultProps.name,
  title = defaultProps.title,
  bio = defaultProps.bio,
  location = defaultProps.location,
  experience = defaultProps.experience,
  education = defaultProps.education,
  profileImage = defaultProps.profileImage,
  skills = defaultProps.skills,
}: QuickAboutSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="section-shell relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_85%_75%,rgba(20,184,166,0.08),transparent_38%)]" />
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
        />
      </div>

      <div className="layout-container relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid items-center gap-10 md:grid-cols-2"
        >
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="relative h-64 w-64 overflow-hidden rounded-3xl border-4 border-background bg-gradient-to-br from-sky-500/15 via-teal-500/10 to-emerald-500/15 shadow-2xl sm:h-80 sm:w-80"
              >
                {profileImage ? (
                  <Image
                    src={getOptimizedImageUrl(profileImage, 900, 82)}
                    alt={name || 'Profile'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-500/20 via-teal-500/20 to-emerald-500/20">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.04, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Code2 className="w-20 h-20 text-white/50" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-sky-600/80">About Me</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
                Hello, I&apos;m{' '}
                <span className="bg-[linear-gradient(100deg,#0ea5e9_0%,#14b8a6_55%,#f59e0b_100%)] bg-clip-text text-transparent">
                  {name?.split(' ')[0] || 'Jabes'}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium">{title}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: bio || '' }} />

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 py-4 md:justify-start">
              {location && (
                <motion.div 
                  className="flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2"
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <MapPin className="h-4 w-4 text-sky-600" />
                  <span className="text-sm font-medium">{location}</span>
                </motion.div>
              )}
              {experience && (
                <motion.div 
                  className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2"
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <Briefcase className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">{experience}</span>
                </motion.div>
              )}
              {education && (
                <motion.div 
                  className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2"
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <GraduationCap className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">{education}</span>
                </motion.div>
              )}
            </div>

            {/* Skills Tags */}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                {skills.slice(0, 6).map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="cursor-default border border-border/70 bg-background/80 px-4 py-1.5 transition-colors duration-300 hover:border-sky-500/30"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center md:justify-start"
            >
              <Button 
                asChild 
                size="lg" 
                className="group bg-[linear-gradient(120deg,#0f766e,#0ea5e9)] text-primary-foreground shadow-[0_12px_24px_-12px_rgba(14,165,233,0.55)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_30px_-14px_rgba(14,165,233,0.65)]"
              >
                <Link href="/about">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
