"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Wrench } from "lucide-react"

import { SkillsTable } from "@/components/admin/skills/skills-table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SkillsPage() {
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
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Skills</h1>
            <p className="text-muted-foreground">
              Manage your technical skills and proficiency levels
            </p>
          </div>
        </div>
      </motion.div>

      {/* Skills Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>All Skills</CardTitle>
            <CardDescription>
              Add, edit, or remove skills from your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SkillsTable />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
