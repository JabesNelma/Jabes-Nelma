"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"

import { SkillForm } from "@/components/admin/skills/skill-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add New Skill</h1>
            <p className="text-muted-foreground">
              Add a new skill to your portfolio
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Skill Details</CardTitle>
            <CardDescription>
              Fill in the details for your new skill
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SkillForm />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
