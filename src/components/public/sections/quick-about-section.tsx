'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MapPin, Briefcase, GraduationCap, Code2, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRef } from 'react'

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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
        <motion.div
          animate={{ 
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -right-20 top-1/4 w-96 h-96 opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(120, 119, 198, 0.2), transparent, rgba(255, 119, 115, 0.2), transparent)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 bottom-0 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Decorative Rings */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3 }}
                className="absolute -inset-8 rounded-full border-2 border-dashed border-primary/20"
                style={{ animation: 'spin 20s linear infinite' }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4 }}
                className="absolute -inset-16 rounded-full border border-purple-500/10"
              />
              
              {/* Gradient Orbs */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-2xl opacity-30"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-2xl opacity-20"
              />
              
              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-background shadow-2xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20"
              >
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={name || 'Profile'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/30">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Code2 className="w-20 h-20 text-white/50" />
                    </motion.div>
                  </div>
                )}
                
                {/* Shimmer Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 text-sm font-medium mb-4"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                About Me
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
                Hello, I&apos;m{' '}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {name?.split(' ')[0] || 'Jabes'}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium">{title}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: bio || '' }} />

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 py-4">
              {location && (
                <motion.div 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{location}</span>
                </motion.div>
              )}
              {experience && (
                <motion.div 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Briefcase className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">{experience}</span>
                </motion.div>
              )}
              {education && (
                <motion.div 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/5 to-orange-500/5 border border-pink-500/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <GraduationCap className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium">{education}</span>
                </motion.div>
              )}
            </div>

            {/* Skills Tags */}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
                      className="px-4 py-1.5 bg-gradient-to-r from-secondary to-secondary/80 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300 cursor-default"
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
            >
              <Button 
                asChild 
                size="lg" 
                className="group bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
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
