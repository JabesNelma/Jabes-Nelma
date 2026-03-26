"use client"

import { motion, MotionProps } from "framer-motion"
import { ReactNode } from "react"
import { useEffect, useState } from "react"

interface AnimatedDivProps extends MotionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className, delay = 0, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInUp({ children, className, delay = 0, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInScale({ children, className, delay = 0, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideInLeft({ children, className, delay = 0, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideInRight({ children, className, delay = 0, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.4 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function TextReveal({ children, className, delay = 0 }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 16,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    const startTimer = setTimeout(() => {
      let index = 0
      interval = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          if (interval) clearInterval(interval)
        }
      }, speed)
    }, delay * 1000)

    return () => {
      clearTimeout(startTimer)
      if (interval) clearInterval(interval)
    }
  }, [text, delay, speed])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.7 }}
          className="ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  )
}
