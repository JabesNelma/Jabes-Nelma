'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

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
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function HeroSection({
  name = defaultProps.name,
  title = defaultProps.title,
  introduction = defaultProps.introduction,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(22,163,74,0.12),transparent_40%),radial-gradient(circle_at_80%_18%,rgba(14,165,233,0.16),transparent_36%),radial-gradient(circle_at_50%_90%,rgba(245,158,11,0.1),transparent_45%)]" />
        <motion.div
          aria-hidden
          initial={{ opacity: 0.3, scale: 0.96 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute left-1/2 top-[-10%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.22),rgba(14,165,233,0)_70%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(248,250,252,0.08)_45%,var(--background)_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{' '}
            <span className="bg-[linear-gradient(100deg,#0ea5e9_0%,#14b8a6_50%,#f59e0b_100%)] bg-clip-text text-transparent">
                {name}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-xl font-medium text-foreground/80 sm:text-2xl md:text-[1.9rem]"
          >
            {title}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {introduction}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group min-w-44 bg-[linear-gradient(120deg,#0f766e,#0ea5e9)] text-primary-foreground shadow-[0_12px_24px_-12px_rgba(14,165,233,0.55)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_30px_-14px_rgba(14,165,233,0.65)]"
            >
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-44 border-border/70 bg-background/70 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-sky-500/60 hover:bg-sky-500/5"
            >
              <Link href="/contact">Contact Me</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
