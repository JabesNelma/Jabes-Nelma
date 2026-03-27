'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Code2, Rocket, Palette } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  name?: string
  title?: string
  introduction?: string
}

const defaultProps: HeroSectionProps = {
  name: 'Jabes Nelma',
  title: 'Full Stack Developer',
  introduction: 'I craft beautiful, performant web applications with modern technologies. Passionate about clean code, user experience, and turning ideas into reality.',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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
      damping: 12,
    },
  },
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function HeroSection({
  name = defaultProps.name,
  title = defaultProps.title,
  introduction = defaultProps.introduction,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary Gradient Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
              radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255, 119, 115, 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 20% 80%, rgba(74, 222, 128, 0.15), transparent)
            `,
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 -left-20 w-72 h-72 rounded-full opacity-60 dark:opacity-30"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full opacity-50 dark:opacity-25"
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            filter: 'blur(60px)',
            animationDelay: '1s',
          }}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-40 dark:opacity-20"
          style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            filter: 'blur(60px)',
            animationDelay: '2s',
          }}
        />

        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(120, 119, 198, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(120, 119, 198, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute inset-0 -z-5 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[10%] text-primary/20"
        >
          <Code2 className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[15%] text-purple-500/20"
        >
          <Rocket className="w-10 h-10" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 left-[20%] text-emerald-500/20"
        >
          <Palette className="w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="container px-4 md:px-6 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Greeting Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/10 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
                Welcome to my portfolio
              </span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Hi, I&apos;m{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {name}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 -z-0 origin-left rounded-full"
              />
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium mb-6"
          >
            {title}
          </motion.p>

          {/* Introduction */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {introduction}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="group bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              <Link href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:via-purple-500/10 hover:to-pink-500/10 transition-all duration-300 hover:scale-105"
            >
              <Link href="/contact">
                Contact Me
              </Link>
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1 bg-gradient-to-b from-primary/20 to-transparent">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 h-2 bg-gradient-to-b from-primary to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
