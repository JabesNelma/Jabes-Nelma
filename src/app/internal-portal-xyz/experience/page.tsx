"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

import { ExperienceTable } from "@/components/admin/experience/experience-table"

export default function ExperienceListPage() {
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Experience</h1>
          <p className="text-muted-foreground">
            Manage your professional work experience
          </p>
        </div>
      </motion.div>

      {/* Experience Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ExperienceTable />
      </motion.div>
    </div>
  )
}
