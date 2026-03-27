"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ExperienceForm } from "@/components/admin/experience/experience-form"

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Add Experience</h1>
          <p className="text-muted-foreground">
            Add a new work experience to your portfolio
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/internal-portal-xyz/experience">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
      </motion.div>

      {/* Experience Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ExperienceForm />
      </motion.div>
    </div>
  )
}
