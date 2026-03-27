"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { ProjectForm } from "@/components/admin/projects/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground">
          Create a new portfolio project
        </p>
      </motion.div>

      {/* Project Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ProjectForm />
      </motion.div>
    </div>
  )
}
